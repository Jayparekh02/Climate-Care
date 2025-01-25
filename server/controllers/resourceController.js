import * as resourceService from "../services/resourceService.js";

export const createResource = async (req, res) => {
  try {
    const resource = await resourceService.createResource(req.body);
    res.status(201).json(resource);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

export const getResources = async (req, res) => {
  try {
    const { limit = 10, type } = req.query;
    const resources = await resourceService.fetchResources(limit, type);
    res.status(200).json({
      message: "Resources fetched successfully",
      resources: resources,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateResource = async (req, res) => {
  try {
    const updatedResource = await resourceService.updateResource(
      req.params.id,
      req.body
    );
    if (!updatedResource) {
      return res.status(404).send("Resource not found.");
    }
    res.json(updatedResource);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteResource = async (req, res) => {
  try {
    await resourceService.deleteResource(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
