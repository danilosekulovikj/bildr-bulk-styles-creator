import * as csstree from "css-tree";
import { performActions } from "./performActions";

export function cssStringToArray(rawCSS) {
  // Parse the CSS
  const ast = csstree.parse(rawCSS);

  let selectorsArray = [];

  // Walk through the CSS AST (Abstract Syntax Tree)
  csstree.walk(ast, (node) => {
    // Handle media queries
    if (node.type === "Atrule" && node.name === "media") {
      let mediaQuery;
      // Extract the media query value
      csstree.walk(node, (node) => {
        if (node.type === "MediaFeature") {
          mediaQuery = node.value.value;
        }
      });

      // Walk through the media query node
      csstree.walk(node, (node) => {
        if (node.type === "Rule") {
          // Collect the attributes for the rule
          let attributes = collectAttributes(node);

          // Walk through the rule node
          csstree.walk(node, (node) => {
            if (node.type === "Selector") {
              // Process the selector node
              let selector = processSelector(node);
              // Assign the attributes to the selector
              selector.attributes = attributes;

              // Find the primary selector index
              let primaryIndex = findPrimarySelectorIndex(
                selectorsArray,
                selector
              );

              // If primaryIndex is -1, it means the selector is not in the array yet
              if (primaryIndex === -1) {
                primaryIndex =
                  selectorsArray.push({
                    selector: selector.selector,
                  }) - 1;
              }

              // If the selector has a pseudoName, handle the pseudo selector
              if (selector.pseudoName) {
                // Find the pseudo selector index
                let pseudoIndex = findPseudoSelectorIndex(
                  selectorsArray[primaryIndex].pseudoSelectors,
                  selector
                );

                // If pseudoIndex is -1, it means the pseudo selector is not in the array yet
                if (pseudoIndex === -1) {
                  // Add the media query and attributes to the new pseudo selector
                  selector.mediaQueries = [
                    { name: mediaQuery, attributes: attributes },
                  ];
                  delete selector.selector;
                  selectorsArray[primaryIndex].pseudoSelectors.push(selector);
                } else {
                  // If the pseudo selector does not have a mediaQueries array, create one
                  if (
                    !selectorsArray[primaryIndex].pseudoSelectors[pseudoIndex]
                      .mediaQueries
                  ) {
                    selectorsArray[primaryIndex].pseudoSelectors[
                      pseudoIndex
                    ].mediaQueries = [];
                  }
                  // Add the media query and attributes to the existing pseudo selector
                  selectorsArray[primaryIndex].pseudoSelectors[
                    pseudoIndex
                  ].mediaQueries.push({
                    name: mediaQuery,
                    attributes: attributes,
                  });
                }
              } else {
                // If the selector does not have a mediaQueries array, create one
                if (!selectorsArray[primaryIndex].mediaQueries) {
                  selectorsArray[primaryIndex].mediaQueries = [];
                }
                // Add the media query and attributes to the existing selector
                selectorsArray[primaryIndex].mediaQueries.push({
                  name: mediaQuery,
                  attributes: attributes,
                });
              }
            }
          });
        }
      });
    }
    // Handle non-media query rules
    else if (node.type === "Rule") {
      let attributes = collectAttributes(node);

      // Walk through the rule node
      csstree.walk(node, (node) => {
        if (node.type === "Selector") {
          // Process the selector node
          let selector = processSelector(node);
          // Assign the attributes to the selector
          selector.attributes = attributes;

          // Find the primary selector index
          let primaryIndex = findPrimarySelectorIndex(selectorsArray, selector);

          // If primaryIndex is -1, it means the selector is not in the array yet
          if (primaryIndex === -1) {
            // If the selector has a pseudoName, create a new pseudoSelectors array
            if (selector.pseudoName) {
              selector.pseudoSelectors = [{ pseudoName: selector.pseudoName }];
              delete selector.pseudoName;
            }
            // Add the selector to the selectors array
            selectorsArray.push(selector);
          } else {
            // If the selector has a pseudoName, handle the pseudo selector
            if (selector.pseudoName) {
              // If the primary selector does not have a pseudoSelectors array, create one
              if (!selectorsArray[primaryIndex].pseudoSelectors) {
                selectorsArray[primaryIndex].pseudoSelectors = [];
              }
              // Find the pseudo selector index
              let pseudoIndex = findPseudoSelectorIndex(
                selectorsArray[primaryIndex].pseudoSelectors,
                selector
              );
              // If pseudoIndex is -1, it means the pseudo selector is not in the array yet
              if (pseudoIndex === -1) {
                selectorsArray[primaryIndex].pseudoSelectors.push({
                  pseudoName: selector.pseudoName,
                  attributes: selector.attributes,
                });
              }
            }
          }
        }
      });
    }
  });

  // Function to process the selector node
  function processSelector(node) {
    let selector = {};
    csstree.walk(node, (node) => {
      if (node.type === "ClassSelector") {
        selector.selector = node.name;
      }

      if (node.type === "PseudoClassSelector") {
        if (node.name) {
          // Handle any pseudo selectors that have attributes
          if (node.children) {
            node.children.forEach((childNode) => {
              if (childNode.type === "Declaration") {
                if (!selector.attributes) {
                  selector.attributes = [];
                }
                let attribute = {
                  propertyName: childNode.property,
                  value:
                    csstree.generate(childNode.value) +
                    (childNode.important ? " !important" : ""),
                };

                selector.attributes.push(attribute);
              }
            });
          }
          // Set the pseudo selector name
          selector.pseudoName = node.name;
        }
      }
    });
    return selector;
  }

  // Function to find the primary selector index in the selectors array
  function findPrimarySelectorIndex(selectorsArray, selector) {
    for (let i = 0; i < selectorsArray.length; i++) {
      if (selectorsArray[i].selector === selector.selector) {
        return i;
      }
    }
    return -1;
  }

  // Function to find the pseudo selector index in the pseudoSelectors array
  function findPseudoSelectorIndex(pseudoSelectorsArray, selector) {
    if (!pseudoSelectorsArray) {
      return -1;
    }

    for (let i = 0; i < pseudoSelectorsArray.length; i++) {
      if (pseudoSelectorsArray[i].pseudoName === selector.pseudoName) {
        return i;
      }
    }
    return -1;
  }

  // Function to collect attributes for a given rule
  function collectAttributes(rule) {
    let attributes = [];

    csstree.walk(rule, (node) => {
      if (node.type === "Declaration") {
        let attribute = {
          propertyName: node.property,
          value:
            csstree.generate(node.value) + (node.important ? "!important" : ""),
        };
        attributes.push(attribute);
      }
    });

    return attributes;
  }

  selectorsArray = selectorsArray.filter((obj) => "selector" in obj);

  performActions(selectorsArray);
  return selectorsArray;
}
