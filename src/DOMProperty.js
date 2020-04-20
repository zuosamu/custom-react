function PropertyInfoRecord(name, attributeName) {
  this.name = name;
  this.attributeName = attributeName;
}

const properties = {};
[["className", "class"]].forEach(([name, attributeName]) => {
  properties[name] = new PropertyInfoRecord(name, attributeName);
});

export function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}
