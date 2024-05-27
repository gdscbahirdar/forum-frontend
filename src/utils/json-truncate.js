function truncateJson(jsonData, limit = 230) {
  let currentLength = 0;
  let result = "";

  function traverseContent(content) {
    for (let item of content) {
      if (item.type === "text") {
        let remainingLength = limit - currentLength;
        if (item.text.length <= remainingLength) {
          result += item.text;
          currentLength += item.text.length;
        } else {
          result += item.text.slice(0, remainingLength) + "...";
          return;
        }
      } else if (item.content) {
        traverseContent(item.content);
        if (currentLength >= limit) return;
      }
    }
  }

  traverseContent(jsonData.content);
  return result;
}

export default truncateJson;
