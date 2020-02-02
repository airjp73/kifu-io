import { GameTree, GameTreeNode } from './normalizeGameTree';
import { NodeProperties } from './parseSgf';

function createSgfFromGameTree(gameTree: GameTree): string {
  function traverse(node: GameTreeNode, parenTabs: string): string {
    const moveTabs = `${parenTabs}  `;
    let moves: string = '';

    let nextNode: GameTreeNode | null = node;

    while (nextNode) {
      const currentNode = nextNode;
      nextNode = null;
      moves += `\n${moveTabs};`;

      if (currentNode.properties) {
        moves += stringifyProperties(currentNode.properties);
      }

      const numChildren = currentNode.children?.length ?? 0;
      if (numChildren === 1) {
        nextNode = gameTree.nodes[currentNode.children[0]];
      } else if (numChildren > 1) {
        moves +=
          '\n' +
          currentNode.children
            .map(child => traverse(gameTree.nodes[child], moveTabs))
            .join('\n');
      }
    }

    return `${parenTabs}(${moves}\n${parenTabs})`;
  }

  return traverse(gameTree.nodes[gameTree.rootNode], '');
}

function stringifyProperties(props: NodeProperties): string {
  const escapeAndWrapValue = (val: string) => {
    const escapedVal = val.replace(/[[\]]/g, '\\$&');
    return `[${escapedVal}]`;
  };

  const stringifyValues = (values: string[]) =>
    values.map(escapeAndWrapValue).join('');

  return Object.entries(props)
    .map(([propName, values]) => `${propName}${stringifyValues(values)}`)
    .join('');
}

export default createSgfFromGameTree;
