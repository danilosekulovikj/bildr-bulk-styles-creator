export function generateMediaStylesBody(
  newMediaRes,
  newClassRes,
  attribute,
  bildrSocketID,
  revisionID,
  projectID
) {
  const parentId =
    newMediaRes.obj && newMediaRes.obj.recs
      ? newMediaRes.obj.recs[0].id
      : newMediaRes.id;

  const parentName =
    newMediaRes.obj && newMediaRes.obj.recs
      ? newMediaRes.obj.recs[0].name
      : newMediaRes.name;

  const { id: childId } = newClassRes.obj.recs[0];

  return {
    recs: [
      {
        id: 0,
        type: 1,
        parentId: parentId,
        name: `.css_${childId}:${parentName}`,
        opts: {
          mediaQueryChild: 1,
          fromStyleID: childId,
          fromPropertyName: attribute.propertyName,
          stylesArray: [
            {
              propertyName: "selector",
              value: `.css_${childId}`,
            },
            attribute,
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
