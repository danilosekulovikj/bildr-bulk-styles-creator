export function generateReqBody(
  projectID,
  revisionID,
  bildrSocketID,
  selector,
  attributes,
  isPrimary
) {
  const rec = {
    id: 0,
    name: selector,
    options: {
      stylesArray: attributes,
    },
  };

  if (isPrimary) {
    rec.options.mainStyle = 1;
  }

  return {
    recs: [rec],
    groupID: null,
    bildrSocketID: bildrSocketID,
    fltSetIsSelected: 0,
    revisionID: revisionID,
    projectID: projectID,
  };
}
