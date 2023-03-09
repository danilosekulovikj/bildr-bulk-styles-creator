export function generateReqBody({
  projectID,
  revisionID,
  bildrSocketID,
  selector,
  attributes,
  isPrimary,
  id,
  fromStyleID,
  states,
}) {
  const rec = {
    options: {},
  };

  if (id) {
    rec.id = id;
  } else {
    rec.id = 0;
  }

  if (selector) {
    rec.name = selector;
  }

  if (attributes) {
    rec.options = {
      ...rec.options,
      stylesArray: attributes,
    };
  }

  if (isPrimary) {
    rec.options = {
      ...rec.options,
      mainStyle: 1,
    };
  }

  if (fromStyleID) {
    rec.options = {
      ...rec.options,
      state: 1,
      fromStyleID: fromStyleID,
    };
  }

  if (states) {
    rec.options = {
      ...rec.options,
      states: states,
    };
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
