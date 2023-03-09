import { generateReqBody } from "./generateReqBody";
import { generateUID } from "./generateUID";
import { isPrimary } from "../components/createClassTypeSwitch";

// Get the project and revision IDs
let projectID = window.baseSelProjID;
let revisionID = window.baseSelRevID;
let bildrSocketID = generateUID();

export async function performActions(classesArray) {
  try {
    for (const [index, classObj] of classesArray.entries()) {
      const { selector, attributes, children } = classObj;

      const response1 = await fetch("https://www.bildr.com/_/record/save/18", {
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
      });
      const data1 = await response1.json();

      const primaryClassID = data1.obj.recs[0].id;
      const states = [{ state: "default", default: 1 }];

      children.forEach(async (child) => {
        const defaultPseudoAttributes = [
          {
            newProperty: "0",
            propertyName: "selector",
            value: `.css_${primaryClassID}:${child.pseudoSelectorName}`,
            originalPropertyName: "selector",
            enterManually: "",
          },
        ];
        const response2 = await fetch(
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
                selector: child.pseudoSelectorName,
                attributes: [
                  ...defaultPseudoAttributes,
                  ...child.pseudoAttributes,
                ],
                fromStyleID: primaryClassID,
              })
            ),
            method: "POST",
            mode: "cors",
            credentials: "include",
          }
        );

        const data2 = await response2.json();

        const pseudoClassID = data2.obj.recs[0].id;
        const pseudoClassName = data2.obj.recs[0].name;
        // const states = [
        //   { state: "default", default: 1 },
        //   { state: "hover", default: 1 },
        //   { state: "disabled", default: 1 },
        //   {
        //     state: pseudoClassName,
        //     styleClassID: pseudoClassID,
        //   },
        // ];

        //   console.log(child.pseudoSelectorName);
        //   console.log([...defaultPseudoAttributes, ...child.pseudoAttributes]);
        //   console.log(pseudoClassName);
        //   console.log(pseudoClassID);

        if (pseudoClassName && pseudoClassID) {
          states.push({
            state: pseudoClassName,
            styleClassID: pseudoClassID,
          });
        }

        if (
          !states.find((state) => state.state === "hover") &&
          child.pseudoSelectorName === "hover"
        ) {
          states.push({ state: "hover", default: 1 });
        }

        if (
          !states.find((state) => state.state === "disabled") &&
          child.pseudoSelectorName === "disabled"
        ) {
          states.push({ state: "disabled", default: 1 });
        }

        const response3 = await fetch(
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
      });

      // const data3 = await response3.json();
    }
    console.log("All actions complete.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
