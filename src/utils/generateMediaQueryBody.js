import { bildrSocketID, revisionID, projectID } from "./performActions";

export function generateMediaQueryBody(mediaQuery) {
  return {
    recs: [
      {
        id: 0,
        type: 4,
        name: mediaQuery.name,
        opts: {
          stylesArray: [
            {
              propertyName: "selector",
              value: `@media only screen and (max-width: ${mediaQuery.name}px)`,
            },
          ],
        },
      },
    ],
    groupID: null,
    bildrSocketID: bildrSocketID,
    fltSetIsSelected: 0,
    revisionID: revisionID,
    projectID: projectID,
  };
}
