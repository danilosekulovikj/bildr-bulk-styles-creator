import { generateReqBody } from "./generateReqBody";
import { generateUID } from "./generateUID";
import { isPrimary } from "../components/createClassTypeSwitch";
import { findMediaQuery } from "./findMediaQuery";
import { generateMediaStylesBody } from "./generateMediaStylesBody";
import { generateMediaQueryBody } from "./generateMediaQueryBody";

// Get the project and revision IDs
export const projectID = window.baseSelProjID;
export const revisionID = window.baseSelRevID;
export const bildrSocketID = generateUID();

export async function performActions(classesArray) {
  try {
    for (const [index, classObj] of classesArray.entries()) {
      const { selector, attributes, pseudoSelectors, mediaQueries } = classObj;

      const newClassReq = await fetch(
        "https://www.bildr.com/_/record/save/18",
        {
          headers: {
            accept: "*/*",
            "content-type": "application/json",
          },
          body: JSON.stringify(
            generateReqBody({
              projectID: projectID,
              revisionID: revisionID,
              bildrSocketID: bildrSocketID,
              selector: selector,
              attributes: attributes,
              isPrimary: isPrimary,
            })
          ),
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );

      const newClassRes = await newClassReq.json();

      const primaryMediaQueryPromise = [];

      if (mediaQueries) {
        for (const mediaQuery of mediaQueries) {
          await (async () => {
            // Check if the media query exists
            const foundMediaQuery = findMediaQuery(mediaQuery);

            if (foundMediaQuery) {
              // Update the media query

              mediaQuery.attributes.forEach(async (attribute) => {
                const msbody = generateMediaStylesBody(
                  foundMediaQuery,
                  newClassRes,
                  attribute,
                  bildrSocketID,
                  revisionID,
                  projectID
                );

                await fetch("https://www.bildr.com/_/record/save/18", {
                  headers: {
                    accept: "*/*",
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(msbody),
                  method: "POST",
                  mode: "cors",
                  credentials: "include",
                });
              });
            } else {
              // Create a new media query
              const newMediaQueryPromise = new Promise(
                async (resolve, reject) => {
                  try {
                    const mqbody = generateMediaQueryBody(mediaQuery);

                    const newMediaReq = await fetch(
                      "https://www.bildr.com/_/record/save/18",
                      {
                        headers: {
                          accept: "*/*",
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(mqbody),
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                      }
                    );

                    const newMediaRes = await newMediaReq.json();

                    mediaQuery.attributes.forEach(async (attribute) => {
                      const msbody = generateMediaStylesBody(
                        newMediaRes,
                        newClassRes,
                        attribute,
                        bildrSocketID,
                        revisionID,
                        projectID
                      );

                      await fetch("https://www.bildr.com/_/record/save/18", {
                        headers: {
                          accept: "*/*",
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(msbody),
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                      });
                    });
                    resolve();
                  } catch (error) {
                    reject(error);
                  }
                }
              );
              // Add the promise to the array
              primaryMediaQueryPromise.push(newMediaQueryPromise);
            }
          })();
        }
        // Wait for all the promises to resolve
        await Promise.all(primaryMediaQueryPromise);
      }

      const primaryClassID = newClassRes.obj.recs[0].id;
      const states = [
        { state: "default", default: 1 },
        { state: "hover", default: 1 },
        { state: "disabled", default: 1 },
      ];

      let newAttrRes;
      const primaryPseudoClassPromise = [];

      if (pseudoSelectors) {
        for (const pseudoSelector of pseudoSelectors) {
          await (async () => {
            const defaultPseudoAttributes = [
              {
                newProperty: "0",
                propertyName: "selector",
                value: `.css_${primaryClassID}:${pseudoSelector.pseudoName}`,
                originalPropertyName: "selector",
                enterManually: "",
              },
            ];

            if (pseudoSelector.attributes) {
              const pseudoClassPromise = new Promise(
                async (resolve, reject) => {
                  try {
                    const newAttrReq = await fetch(
                      "https://www.bildr.com/_/record/save/18",
                      {
                        headers: {
                          accept: "*/*",
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(
                          generateReqBody({
                            projectID: projectID,
                            revisionID: revisionID,
                            bildrSocketID: bildrSocketID,
                            selector: pseudoSelector.pseudoName,
                            attributes: [
                              ...defaultPseudoAttributes,
                              ...pseudoSelector.attributes,
                            ],
                            fromStyleID: primaryClassID,
                          })
                        ),
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                      }
                    );

                    newAttrRes = await newAttrReq.json();

                    const pseudoClassID = newAttrRes.obj.recs[0].id;
                    const pseudoClassName = newAttrRes.obj.recs[0].name;

                    if (pseudoClassName && pseudoClassID) {
                      const existingState = states.find(
                        (state) => state.state === pseudoClassName
                      );
                      if (existingState) {
                        existingState.styleClassID = pseudoClassID;
                      } else {
                        states.push({
                          state: pseudoClassName,
                          styleClassID: pseudoClassID,
                        });
                      }
                    }

                    resolve();
                  } catch (error) {
                    reject(error);
                  }
                }
              );
              // Add the promise to the array
              primaryPseudoClassPromise.push(pseudoClassPromise);
            }

            // Wait for all the promises to resolve
            await Promise.all(primaryPseudoClassPromise);

            // Update the pseudo states
            const newPseudoStatesReq = await fetch(
              "https://www.bildr.com/_/record/save/18",
              {
                headers: {
                  accept: "*/*",
                  "content-type": "application/json",
                },
                body: JSON.stringify(
                  generateReqBody({
                    projectID: projectID,
                    revisionID: revisionID,
                    bildrSocketID: bildrSocketID,
                    isPrimary: isPrimary,
                    attributes: attributes,
                    states: states,
                    id: primaryClassID,
                  })
                ),
                method: "POST",
                mode: "cors",
                credentials: "include",
              }
            );

            const nestedMediaQueriesPromises = [];

            if (pseudoSelector.mediaQueries) {
              for (const mediaQuery of pseudoSelector.mediaQueries) {
                await (async () => {
                  // Check if the media query exists
                  const foundMediaQuery = findMediaQuery(mediaQuery);

                  if (foundMediaQuery) {
                    // Update the media query

                    mediaQuery.attributes.forEach(async (attribute) => {
                      const msbody = generateMediaStylesBody(
                        foundMediaQuery,
                        newAttrRes,
                        attribute,
                        bildrSocketID,
                        revisionID,
                        projectID
                      );

                      await fetch("https://www.bildr.com/_/record/save/18", {
                        headers: {
                          accept: "*/*",
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(msbody),
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                      });
                    });
                  } else {
                    // Create a new media query
                    const newMediaQueryPromise = new Promise(
                      async (resolve, reject) => {
                        try {
                          const mqbody = generateMediaQueryBody(mediaQuery);

                          const newMediaReq = await fetch(
                            "https://www.bildr.com/_/record/save/18",
                            {
                              headers: {
                                accept: "*/*",
                                "content-type": "application/json",
                              },
                              body: JSON.stringify(mqbody),
                              method: "POST",
                              mode: "cors",
                              credentials: "include",
                            }
                          );

                          const newMediaRes = await newMediaReq.json();

                          mediaQuery.attributes.forEach(async (attribute) => {
                            const msbody = generateMediaStylesBody(
                              newMediaRes,
                              newAttrRes,
                              attribute,
                              bildrSocketID,
                              revisionID,
                              projectID
                            );

                            await fetch(
                              "https://www.bildr.com/_/record/save/18",
                              {
                                headers: {
                                  accept: "*/*",
                                  "content-type": "application/json",
                                },
                                body: JSON.stringify(msbody),
                                method: "POST",
                                mode: "cors",
                                credentials: "include",
                              }
                            );
                          });
                          resolve();
                        } catch (error) {
                          reject(error);
                        }
                      }
                    );
                    // Add the promise to the array
                    nestedMediaQueriesPromises.push(newMediaQueryPromise);
                  }
                })();
              }
              // Wait for all the promises to resolve
              await Promise.all(nestedMediaQueriesPromises);
            }
          })();
        }
      }
    }
    console.log("All actions complete.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
