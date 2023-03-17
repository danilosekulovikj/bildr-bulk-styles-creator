export function findMediaQuery(mediaQuery, createdMediaQueries) {
  let searchName;

  switch (parseInt(mediaQuery.name, 10)) {
    case 320:
      searchName = "Mobile Portrait";
      break;
    case 480:
      searchName = "Mobile Landscape";
      break;
    case 768:
      searchName = "Tablet";
      break;
    case 1440:
      searchName = "Laptop";
      break;
    case 2560:
      searchName = "Ultra-Wide";
      break;
    default:
      searchName = mediaQuery.name;
      break;
  }

  const allMediaQueries = [
    ...brwFormRoot._vars.mediaQueriesArray,
    ...createdMediaQueries,
  ];

  const foundMediaQuery = allMediaQueries.find((mq) => mq.name === searchName);

  return foundMediaQuery;
}
