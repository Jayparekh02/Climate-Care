import Resource from "../models/resourceModel.js";

async function createResource(data) {
  const resource = new Resource(data);
  return await resource.save();
}

async function fetchResources(limit, type) {
  const query = type ? { resourceType: type } : {};
  return await Resource.find();
}

async function updateResource(id, data) {
  return await Resource.findByIdAndUpdate(id, data, {
    new: true,
    useFindAndModify: false,
  });
}

async function deleteResource(id) {
  return await Resource.findByIdAndDelete(id);
}

export { createResource, fetchResources, updateResource, deleteResource };
