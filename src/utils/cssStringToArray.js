import * as csstree from "css-tree";
import { performActions } from "./performActions";

export function cssStringToArray(rawCSS) {
  // Parse the CSS
  const ast = csstree.parse(rawCSS);

  // Extract class selectors and their properties
  let result = [];
  csstree.walk(ast, {
    visit: "Rule",
    enter: (node) => {
      let className;
      let pseudoClass;
      csstree.walk(node.prelude, {
        visit: "ClassSelector",
        enter: (node) => {
          className = node.name;
        },
      });
      csstree.walk(node.prelude, {
        visit: "PseudoClassSelector",
        enter: (node) => {
          pseudoClass = node.name;
        },
      });
      if (className) {
        let properties = [];
        csstree.walk(node.block, {
          visit: "Declaration",
          enter: (node) => {
            properties.push({
              property: node.property,
              value: csstree.generate(node.value),
            });
          },
        });

        const mainSelectorName = className;

        // remove colon from pseudo-selector name
        const pseudoSelectorName = pseudoClass ? pseudoClass : "";

        const mainSelector = result.find(
          (s) => s.selector === mainSelectorName
        );

        if (mainSelector && pseudoSelectorName) {
          // check if pseudo-selector name exists
          mainSelector.children.push({
            pseudoSelectorName,
            pseudoAttributes: properties,
          });
        } else if (!mainSelector) {
          const newMainSelector = {
            selector: mainSelectorName,
            attributes: properties,
            children: [],
          };

          // check if pseudo-selector name exists before adding initial child
          if (pseudoSelectorName) {
            newMainSelector.children.push({
              pseudoSelectorName,
              pseudoAttributes: properties,
            });
          }

          result.push(newMainSelector);
        }
      }
    },
  });

  performActions(result);
  return result;
}
