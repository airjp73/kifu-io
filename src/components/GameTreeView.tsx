import React, { useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { animated, config, useSpring } from 'react-spring';
import {
  createBlackStone,
  createWhiteStone,
  createSelectionHighlight,
  calculateStonePadding,
} from 'canvas/createStoneSprite';
import { useGoGameContext } from 'contexts/GoGameContext';
import { GameNode } from 'parseSgf/parseSgf';
import { GameTree } from 'parseSgf/normalizeGameTree';
import { hotspotHighlight, stoneSelectionHighlight } from 'style';

const BLACK = 'b';
const WHITE = 'w';
const SETUP = 's';

type TreeCellType = typeof BLACK | typeof WHITE | typeof SETUP;
interface TreeCell {
  type: TreeCellType;
  gridLocation: [number, number];
  parentLocation?: [number, number];
  node: string;
}
type TreeGrid = TreeCell[][];

class GameTreeRenderer {
  // Stone radius won't change on resize
  private static stoneRadius = 15;
  private static highlightRadius = 15 * 1.5;

  // Sprites
  private blackStone: HTMLCanvasElement;
  private whiteStone: HTMLCanvasElement;
  private setupNode: HTMLCanvasElement;
  private selectionHighlight: HTMLCanvasElement;
  private hotspotHighlight: HTMLCanvasElement;

  // Canvas layers
  private stoneLayer: HTMLCanvasElement;
  private lineLayer: HTMLCanvasElement;
  private selectionLayer: HTMLCanvasElement; // Separate from highlight layer because it changes so often
  private highlightLayer: HTMLCanvasElement;

  public constructor(
    stoneLayer: HTMLCanvasElement,
    lineLayer: HTMLCanvasElement,
    selectionLayer: HTMLCanvasElement,
    highlightLayer: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    const canvasWidth = (width + 1) * GameTreeRenderer.stoneRadius * 3.5;
    const canvasHeight = (height + 1) * GameTreeRenderer.stoneRadius * 3.5;

    this.stoneLayer = stoneLayer;
    this.stoneLayer.width = canvasWidth;
    this.stoneLayer.height = canvasHeight;

    this.lineLayer = lineLayer;
    this.lineLayer.width = canvasWidth;
    this.lineLayer.height = canvasHeight;

    this.selectionLayer = selectionLayer;
    this.selectionLayer.width = canvasWidth;
    this.selectionLayer.height = canvasHeight;

    this.highlightLayer = highlightLayer;
    this.highlightLayer.width = canvasWidth;
    this.highlightLayer.height = canvasHeight;

    this.blackStone = createBlackStone(GameTreeRenderer.stoneRadius);
    this.whiteStone = createWhiteStone(GameTreeRenderer.stoneRadius);
    this.selectionHighlight = createSelectionHighlight(
      GameTreeRenderer.highlightRadius,
      stoneSelectionHighlight
    );
    this.hotspotHighlight = createSelectionHighlight(
      GameTreeRenderer.highlightRadius,
      hotspotHighlight
    );
    this.setupNode = this.createSetupNode();
  }

  private createSetupNode = () => {
    const radius = (3 * GameTreeRenderer.stoneRadius) / 4;
    const padding = calculateStonePadding(radius);
    const black = createBlackStone(radius);
    const white = createWhiteStone(radius);

    const canvas = document.createElement('canvas');
    canvas.width = radius * 4 + padding;
    canvas.height = radius * 4 + padding;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(black, padding / 4, padding / 4);
    ctx.drawImage(white, radius + padding / 4, radius / 2 + padding / 4);

    return canvas;
  };

  public drawNode = (x: number, y: number, type: TreeCellType) => {
    let stone;
    switch (type) {
      case BLACK:
        stone = this.blackStone;
        break;
      case WHITE:
        stone = this.whiteStone;
        break;
      default:
        stone = this.setupNode;
        break;
    }

    const ctx = this.stoneLayer.getContext('2d');
    const xCoord = this.getCoord(x);
    const yCoord = this.getCoord(y);
    ctx.drawImage(stone, xCoord, yCoord);
  };

  public drawNodeConnection = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const ctx = this.lineLayer.getContext('2d');
    const stonePadding = calculateStonePadding(GameTreeRenderer.stoneRadius);
    const x1Coord =
      this.getCoord(x1) + GameTreeRenderer.stoneRadius + stonePadding;
    const y1Coord =
      this.getCoord(y1) + GameTreeRenderer.stoneRadius + stonePadding;
    const x2Coord =
      this.getCoord(x2) + GameTreeRenderer.stoneRadius + stonePadding;
    const y2Coord =
      this.getCoord(y2) + GameTreeRenderer.stoneRadius + stonePadding;

    ctx.strokeStyle = '#000'; // Maybe try other colors?
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x1Coord, y1Coord);
    ctx.lineTo(x2Coord, y2Coord);
    ctx.stroke();
  };

  public drawNodeSelection = (x: number, y: number) => {
    const ctx = this.selectionLayer.getContext('2d');
    const stonePadding = calculateStonePadding(GameTreeRenderer.stoneRadius);
    const highlightPadding = 2;
    const radiusDiff =
      GameTreeRenderer.highlightRadius -
      GameTreeRenderer.stoneRadius -
      stonePadding +
      highlightPadding;
    const xCoord = this.getCoord(x) - radiusDiff;
    const yCoord = this.getCoord(y) - radiusDiff;

    // Only show one selection at a time
    ctx.clearRect(0, 0, this.selectionLayer.width, this.selectionLayer.height);
    ctx.drawImage(this.selectionHighlight, xCoord, yCoord);
  };

  public drawHotspot = (x: number, y: number) => {
    const ctx = this.highlightLayer.getContext('2d');
    const stonePadding = calculateStonePadding(GameTreeRenderer.stoneRadius);
    const highlightPadding = 2;
    const radiusDiff =
      GameTreeRenderer.highlightRadius -
      GameTreeRenderer.stoneRadius -
      stonePadding +
      highlightPadding;
    const xCoord = this.getCoord(x) - radiusDiff;
    const yCoord = this.getCoord(y) - radiusDiff;

    ctx.drawImage(this.hotspotHighlight, xCoord, yCoord);
  };

  public getCoord = (gridLocation: number) =>
    gridLocation * GameTreeRenderer.stoneRadius * 3.5;

  public coordToGridLocation = (coord: number) =>
    coord / 3.5 / GameTreeRenderer.stoneRadius;
}

const createGridFromTree = (
  nodeId: string,
  gameTree: GameTree,
  grid: TreeGrid,
  x: number = 0,
  y: number = 0
) => {
  let type: TreeCellType;
  const node = gameTree.nodes[nodeId];
  if (node.properties) {
    if (node.properties.B) type = BLACK;
    else if (node.properties.W) type = WHITE;
    else type = SETUP;
  }

  // If this branch collides with an existing branch,
  // then we need this branch to be lower
  let adjustedY = y;
  while (grid[adjustedY] && grid[adjustedY][x]) {
    adjustedY++;
  }

  node.children &&
    node.children.forEach(child => {
      const childCell = createGridFromTree(
        child,
        gameTree,
        grid,
        x + 1,
        adjustedY
      );

      // Parent location of a cell is set by the parent cell
      childCell.parentLocation = [x, adjustedY];
    });

  const cell: TreeCell = {
    type,
    gridLocation: [x, adjustedY],
    node: nodeId,
  };

  // Add the cell to the grid
  grid[adjustedY] = grid[adjustedY] || [];
  grid[adjustedY][x] = cell;

  return cell;
};

const GameTreeContainer = animated(styled.div`
  overflow: scroll;
  background-color: #ccc;
  position: relative;
  height: 100%;
`);

const GameTreeCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const GameTreeView = () => {
  const nodeLayerRef = useRef(null);
  const lineLayerRef = useRef(null);
  const selectionLayerRef = useRef(null);
  const highlightLayerRef = useRef(null);
  const gameTreeRenderer = useRef(null);
  const containerRef = useRef(null);
  const { gameState, gameTree, goToNode, getNode } = useGoGameContext();

  // Turn the game tree into a format that's easier to work with
  // when drawing the tree
  // TODO: Will need to handle updating this when implementing sgf editing

  const treeGrid: TreeGrid = useMemo(() => {
    const grid: TreeGrid = [];
    createGridFromTree(gameTree.rootNode, gameTree, grid);
    return grid;
  }, []);

  // Draw whole tree
  useEffect(() => {
    if (!gameTreeRenderer.current) {
      gameTreeRenderer.current = new GameTreeRenderer(
        nodeLayerRef.current,
        lineLayerRef.current,
        selectionLayerRef.current,
        highlightLayerRef.current,
        Math.max(...treeGrid.map(row => row.length)),
        treeGrid.length
      );
    }

    treeGrid.forEach((row, yIndex) => {
      row.forEach((treeNode, xIndex) => {
        gameTreeRenderer.current.drawNode(xIndex, yIndex, treeNode.type);
        if (treeNode.parentLocation) {
          gameTreeRenderer.current.drawNodeConnection(
            treeNode.parentLocation[0],
            treeNode.parentLocation[1],
            xIndex,
            yIndex
          );
        }

        // Highlight node if it's a hotspot
        if (getNode(treeNode.node).properties.HO) {
          gameTreeRenderer.current.drawHotspot(xIndex, yIndex);
        }
      });
    });
  }, []);

  // Track current node
  const [containerScroll, setScroll] = useSpring(() => ({
    to: {
      scrollTop: 0,
      scrollLeft: 0,
    },
    // Reduce the precision to minimize the amount of time the scroll hijacked
    config: { ...config.default, precision: 20 },
  }));

  const getCurrentNodePos = () => {
    for (let [yIndex, row] of treeGrid.entries()) {
      for (let [xIndex, treeNode] of row.entries()) {
        if (!treeNode) continue;
        if (treeNode.node === gameState.node) {
          return [xIndex, yIndex];
        }
      }
    }
  };

  useEffect(() => {
    if (!gameTreeRenderer.current) return;
    const [x, y] = getCurrentNodePos();
    gameTreeRenderer.current.drawNodeSelection(x, y);

    const nodeX =
      gameTreeRenderer.current.getCoord(x) -
      containerRef.current.offsetWidth / 3;
    const nodeY =
      gameTreeRenderer.current.getCoord(y) -
      containerRef.current.offsetHeight / 3;

    setScroll({
      to: {
        scrollTop: nodeY,
        scrollLeft: nodeX,
      },
      from: {
        scrollTop: containerRef.current.scrollTop,
        scrollLeft: containerRef.current.scrollLeft,
      },
      reset: true,
    });
  }, [gameState.node]);

  const handleCanvasClick: React.MouseEventHandler = event => {
    const xCoord = event.nativeEvent.offsetX;
    const yCoord = event.nativeEvent.offsetY;
    const x = Math.floor(
      gameTreeRenderer.current.coordToGridLocation(xCoord) - 0.25
    );
    const y = Math.floor(
      gameTreeRenderer.current.coordToGridLocation(yCoord) - 0.25
    );
    if (treeGrid[y] && treeGrid[y][x]) {
      goToNode(treeGrid[y][x].node);
    }
  };

  return (
    <GameTreeContainer {...containerScroll} ref={containerRef}>
      <GameTreeCanvas ref={highlightLayerRef} />
      <GameTreeCanvas ref={selectionLayerRef} />
      <GameTreeCanvas ref={lineLayerRef} />
      <GameTreeCanvas ref={nodeLayerRef} onClick={handleCanvasClick} />
    </GameTreeContainer>
  );
};

export default GameTreeView;
