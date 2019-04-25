import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { animated, config, useSpring } from 'react-spring';
import {
  createBlackStone,
  createWhiteStone,
  createSelectionHighlight,
  calculateStonePadding,
} from 'canvas/createStoneSprite';
import useWindowResizeCallback from 'hooks/useWindowResizeCallback';
import { setCanvasDimensionsWithCorrectScaling } from 'util/canvasUtils';
import { useGoGameContext } from 'contexts/GoGameContext';
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
  public static stoneRadius = 15;
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

  private scrollContainer: HTMLDivElement;
  private viewport = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  private treeHeight: number;

  public constructor(
    stoneLayer: HTMLCanvasElement,
    lineLayer: HTMLCanvasElement,
    selectionLayer: HTMLCanvasElement,
    highlightLayer: HTMLCanvasElement,
    scrollContainer: HTMLDivElement,
    treeHeight: number
  ) {
    this.stoneLayer = stoneLayer;
    this.lineLayer = lineLayer;
    this.selectionLayer = selectionLayer;
    this.highlightLayer = highlightLayer;
    this.scrollContainer = scrollContainer;
    this.treeHeight = treeHeight;

    this.calculateDimensions();

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

  public calculateDimensions = () => {
    const rect = this.scrollContainer.getBoundingClientRect();
    const width = Math.round(rect.right) - Math.round(rect.left);
    const height = this.treeHeight;

    setCanvasDimensionsWithCorrectScaling(this.stoneLayer, width, height);
    setCanvasDimensionsWithCorrectScaling(this.lineLayer, width, height);
    setCanvasDimensionsWithCorrectScaling(this.selectionLayer, width, height);
    setCanvasDimensionsWithCorrectScaling(this.highlightLayer, width, height);
  };

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

  public clear = () => {
    this.stoneLayer
      .getContext('2d')
      .clearRect(0, 0, this.stoneLayer.width, this.stoneLayer.height);
    this.lineLayer
      .getContext('2d')
      .clearRect(0, 0, this.lineLayer.width, this.lineLayer.height);
    this.selectionLayer
      .getContext('2d')
      .clearRect(0, 0, this.selectionLayer.width, this.selectionLayer.height);
    this.highlightLayer
      .getContext('2d')
      .clearRect(0, 0, this.highlightLayer.width, this.highlightLayer.height);
  };

  public setBounds = (
    top: number,
    left: number,
    width: number,
    height: number
  ) => {
    this.viewport = {
      top,
      left,
      right: width + left,
      bottom: height + top,
    };
  };

  private isInBounds = (x: number, y: number) => {
    const xCoord = GameTreeRenderer.getCoord(x);
    const yCoord = GameTreeRenderer.getCoord(y);
    const { top, left, right, bottom } = this.viewport;

    // Give a little leeway so we don't get clipping
    const leeway = GameTreeRenderer.stoneRadius * 10;
    return (
      xCoord >= left - leeway &&
      xCoord <= right + leeway &&
      yCoord >= top - leeway &&
      yCoord <= bottom + leeway
    );
  };

  public drawNode = (
    x: number,
    y: number,
    type: TreeCellType,
    moveNumber?: number
  ) => {
    if (!this.isInBounds(x, y)) return;

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
    const [xCoord, yCoord] = this.getViewportCoords(x, y);
    ctx.drawImage(stone, xCoord, yCoord);

    if (moveNumber) {
      const [textX, textY] = this.getViewportCoords(x + 1, y);
      ctx.font = `${GameTreeRenderer.stoneRadius}px sans-serif`;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';
      ctx.fillStyle = type === BLACK ? 'white' : 'black';
      ctx.fillText(
        `${moveNumber}`,
        textX - GameTreeRenderer.stoneRadius,
        textY + 2 * GameTreeRenderer.stoneRadius
      );
    }
  };

  public drawNodeConnection = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    // Still draw if one end is in bounds
    if (!this.isInBounds(x1, y1) && !this.isInBounds(x2, y2)) return;

    const ctx = this.lineLayer.getContext('2d');
    const stonePadding = calculateStonePadding(GameTreeRenderer.stoneRadius);
    const [x1Coord, y1Coord] = this.getViewportCoords(x1, y1);
    const [x2Coord, y2Coord] = this.getViewportCoords(x2, y2);
    const withPadding = (coord: number) =>
      coord + GameTreeRenderer.stoneRadius + stonePadding;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(withPadding(x1Coord), withPadding(y1Coord));
    ctx.lineTo(withPadding(x2Coord), withPadding(y2Coord));
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
    const [xCoord, yCoord] = this.getViewportCoords(x, y);

    // Only show one selection at a time
    ctx.clearRect(0, 0, this.selectionLayer.width, this.selectionLayer.height);
    ctx.drawImage(
      this.selectionHighlight,
      xCoord - radiusDiff,
      yCoord - radiusDiff
    );
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
    const [xCoord, yCoord] = this.getViewportCoords(x, y);

    ctx.drawImage(
      this.hotspotHighlight,
      xCoord - radiusDiff,
      yCoord - radiusDiff
    );
  };

  public static getCoord = (gridLocation: number) =>
    gridLocation * GameTreeRenderer.stoneRadius * 3.5;

  public coordToGridLocation = (x: number, y: number) => [
    Math.floor(
      (x + this.viewport.left) / 3.5 / GameTreeRenderer.stoneRadius - 0.25
    ),
    Math.floor(
      (y + this.viewport.top) / 3.5 / GameTreeRenderer.stoneRadius - 0.25
    ),
  ];

  public getViewportCoords = (x: number, y: number) => [
    GameTreeRenderer.getCoord(x) - this.viewport.left,
    GameTreeRenderer.getCoord(y) - this.viewport.top,
  ];
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

const ScrollContainer = animated(styled.div`
  overflow: auto;
  height: 100%;
  width: 100%;
  background-color: #ccc;
`);

const GameTreeArea = styled.div`
  position: relative;
  overflow: hidden;
`;

const GameTreeCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

  const width =
    (Math.max(...treeGrid.map(row => row.length)) + 1) *
    GameTreeRenderer.stoneRadius *
    3.5;
  const height = (treeGrid.length + 1) * GameTreeRenderer.stoneRadius * 3.5;

  const drawViewport = () => {
    if (!gameTreeRenderer.current) return;

    gameTreeRenderer.current.clear();
    gameTreeRenderer.current.setBounds(
      containerRef.current.scrollTop,
      containerRef.current.scrollLeft,
      containerRef.current.offsetWidth,
      height
    );

    treeGrid.forEach((row, yIndex) => {
      row.forEach((treeNode, xIndex) => {
        gameTreeRenderer.current.drawNode(
          xIndex,
          yIndex,
          treeNode.type,
          getNode(treeNode.node).moveNumber
        );
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

        // Highlight node if it's the currently selected node
        if (treeNode.node === gameState.node) {
          gameTreeRenderer.current.drawNodeSelection(xIndex, yIndex);
        }
      });
    });
  };

  // Draw whole tree
  useEffect(() => {
    if (!gameTreeRenderer.current) {
      gameTreeRenderer.current = new GameTreeRenderer(
        nodeLayerRef.current,
        lineLayerRef.current,
        selectionLayerRef.current,
        highlightLayerRef.current,
        containerRef.current,
        height
      );
    }
    drawViewport();
  }, []);

  const getCurrentNodePos = (): [number, number] => {
    for (let [yIndex, row] of treeGrid.entries()) {
      for (let [xIndex, treeNode] of row.entries()) {
        if (!treeNode) continue;
        if (treeNode.node === gameState.node) {
          return [xIndex, yIndex];
        }
      }
    }
    // No current node found, use the first one
    return [0, 0];
  };

  // Track current node
  const [containerScroll, setScroll] = useSpring(() => {
    const [x, y] = getCurrentNodePos();
    return {
      to: {
        // Estimate target scroll positions to reduce scrolling on mount
        scrollTop: GameTreeRenderer.getCoord(y) - 20,
        scrollLeft: GameTreeRenderer.getCoord(x) - 50,
      },
      // Reduce the precision to minimize the amount of time the scroll hijacked
      config: { ...config.default, precision: 20 },
    };
  });

  useEffect(() => {
    if (!gameTreeRenderer.current) return;
    const [x, y] = getCurrentNodePos();
    gameTreeRenderer.current.drawNodeSelection(x, y);

    const scrollTop =
      GameTreeRenderer.getCoord(y) - containerRef.current.offsetHeight / 3;
    const scrollLeft =
      GameTreeRenderer.getCoord(x) - containerRef.current.offsetWidth / 3;
    setScroll({
      to: {
        scrollTop,
        scrollLeft,
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
    const [x, y] = gameTreeRenderer.current.coordToGridLocation(xCoord, yCoord);
    if (treeGrid[y] && treeGrid[y][x]) {
      goToNode(treeGrid[y][x].node);
    }
  };

  useWindowResizeCallback(() => {
    gameTreeRenderer.current.calculateDimensions();
    drawViewport();
  });

  const previousScroll = useRef(0);
  const handleScroll = (event: React.SyntheticEvent<HTMLDivElement>) => {
    // Only redraw if horizontal scrolling
    if (previousScroll.current !== event.currentTarget.scrollLeft) {
      drawViewport();
      previousScroll.current = event.currentTarget.scrollLeft;
    }
  };

  return (
    <ScrollContainer
      ref={containerRef}
      onScroll={handleScroll}
      {...containerScroll}
    >
      <div
        css={`
          position: sticky;
          height: 100%;
          left: 0;
        `}
      >
        <GameTreeCanvas ref={highlightLayerRef} />
        <GameTreeCanvas ref={selectionLayerRef} />
        <GameTreeCanvas ref={lineLayerRef} />
        <GameTreeCanvas ref={nodeLayerRef} onClick={handleCanvasClick} />
      </div>
      <GameTreeArea style={{ width, height }} />
    </ScrollContainer>
  );
};

export default GameTreeView;
