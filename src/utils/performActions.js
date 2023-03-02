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
      const { selector, attributes } = classObj;

      fetch("https://www.bildr.com/_/record/save/18", {
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify(
          generateReqBody(
            projectID,
            revisionID,
            bildrSocketID,
            selector,
            attributes,
            isPrimary
          )
        ),
        method: "POST",
        mode: "cors",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    }
    console.log("All actions complete.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
