import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);

      if (!place) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(place);
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({ status: "error finding place" });
      return;
    }
  }

  if (request.method === "PUT") {
    try {
      const placeToUpdate = await Place.findByIdAndUpdate(id, request.body);
      response.status(200).json(placeToUpdate);
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({ status: "error updating places" });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      await Place.findByIdAndDelete(id);
      response.status(260).json("Place deleted");
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({ status: "error deleting places" });
      return;
    }
  }
}
