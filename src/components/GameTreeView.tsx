import React, { useRef, useEffect, useMemo } from 'react';
import { createBlackStone, createWhiteStone } from 'canvas/createStoneSprite';
import { useGoGameContext } from 'contexts/GoGameContext';
import { GameNode } from 'parseSgf/parseSgf';
import styled from 'styled-components';

const BLACK = 'b';
const WHITE = 'w';
const SETUP = 's';

type TreeCellType = typeof BLACK | typeof WHITE | typeof SETUP;
interface TreeCell {
  type: TreeCellType;
  gridLocation: [number, number];
  parentLocation?: [number, number];
}
type TreeGrid = TreeCell[][];

class GameTree {
  // Stone radius won't change on resize
  private static stoneRadius = 15;

  private blackStone: HTMLCanvasElement;
  private whiteStone: HTMLCanvasElement;
  private setupNode: HTMLCanvasElement;
  private stoneLayer: HTMLCanvasElement;
  private lineLayer: HTMLCanvasElement;

  constructor(
    stoneLayer: HTMLCanvasElement,
    lineLayer: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    const canvasWidth = (width + 1) * GameTree.stoneRadius * 3.5;
    const canvasHeight = (height + 1) * GameTree.stoneRadius * 3.5;

    this.stoneLayer = stoneLayer;
    this.stoneLayer.width = canvasWidth;
    this.stoneLayer.height = canvasHeight;
    this.stoneLayer.getContext('2d').imageSmoothingEnabled = false;

    this.lineLayer = lineLayer;
    this.lineLayer.width = canvasWidth;
    this.lineLayer.height = canvasHeight;
    this.lineLayer.getContext('2d').imageSmoothingEnabled = false;

    this.blackStone = createBlackStone(GameTree.stoneRadius);
    this.whiteStone = createWhiteStone(GameTree.stoneRadius);
    this.setupNode = this.createSetupNode();
  }

  private createSetupNode = () => {
    const radius = (3 * GameTree.stoneRadius) / 4;
    const black = createBlackStone(radius);
    const white = createWhiteStone(radius);

    const canvas = document.createElement('canvas');
    canvas.width = radius * 4;
    canvas.height = radius * 4;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(black, 0, 0);
    ctx.drawImage(white, radius, radius / 2);

    return canvas;
  };

  public drawNode = (x: number, y: number, treeCell: TreeCell) => {
    let stone;
    switch (treeCell.type) {
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
    const stonePadding = 2;
    const x1Coord = this.getCoord(x1) + GameTree.stoneRadius + stonePadding;
    const y1Coord = this.getCoord(y1) + GameTree.stoneRadius + stonePadding;
    const x2Coord = this.getCoord(x2) + GameTree.stoneRadius + stonePadding;
    const y2Coord = this.getCoord(y2) + GameTree.stoneRadius + stonePadding;

    ctx.strokeStyle = '#000'; // Maybe try other colors?
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x1Coord, y1Coord);
    ctx.lineTo(x2Coord, y2Coord);
    ctx.stroke();
  };

  private getCoord = (coord: number) => coord * GameTree.stoneRadius * 3.5;
}

const createGridFromTree = (
  node: GameNode,
  grid: TreeGrid,
  x: number = 0,
  y: number = 0
) => {
  let type: TreeCellType;
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
    node.children.forEach((child, index) => {
      const childCell = createGridFromTree(child, grid, x + 1, adjustedY);

      // Parent location of a cell is set by the parent cell
      childCell.parentLocation = [x, adjustedY];
    });

  const cell: TreeCell = {
    type,
    gridLocation: [x, adjustedY],
  };

  // Add the cell to the grid
  grid[adjustedY] = grid[adjustedY] || [];
  grid[adjustedY][x] = cell;

  return cell;
};

const GameTreeCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

const GameTreeView = () => {
  const nodeLayerRef = useRef(null);
  const lineLayerRef = useRef(null);
  const gameTreeRenderer = useRef(null);
  const { gameTree } = useGoGameContext();

  // Turn the game tree into a format that's easier to work with
  // when drawing the tree
  // TODO: Will need to handle updating this when implementing sgf editing
  // TODO: This may need to be an effect instead of a memo?

  useEffect(() => {
    const treeGrid: TreeGrid = [];
    createGridFromTree(gameTree[0], treeGrid);

    if (!gameTreeRenderer.current) {
      gameTreeRenderer.current = new GameTree(
        nodeLayerRef.current,
        lineLayerRef.current,
        Math.max(...treeGrid.map(row => row.length)),
        treeGrid.length
      );
    }

    treeGrid.forEach((row, yIndex) => {
      row.forEach((treeNode, xIndex) => {
        gameTreeRenderer.current.drawNode(xIndex, yIndex, treeNode);
        if (treeNode.parentLocation) {
          gameTreeRenderer.current.drawNodeConnection(
            treeNode.parentLocation[0],
            treeNode.parentLocation[1],
            xIndex,
            yIndex
          );
        }
      });
    });
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <GameTreeCanvas ref={lineLayerRef} />
      <GameTreeCanvas ref={nodeLayerRef} />
    </div>
  );
};

export default GameTreeView;
