import { MongoConection } from "@/lib/conection/mongo";
import Store from "@/lib/models/login";

export async function GET() {
  await MongoConection();
  try {
    const inventory = await Store.find();
    return Response.json({ success: true, data: inventory }, { status: 200 });
  } catch (error: unknown) {
    return Response.json(
      { success: false, message: `Problem in method GET: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await MongoConection();
  try {
    const body = await req.json();
    const newstock = await Store.create(body);
    return Response.json({ success: true, data: newstock }, { status: 201 });
  } catch (error: unknown) {
    return Response.json(
      { success: false, message: `There is a problem with POST: ${error}` },
      { status: 400 }
    );
  }
}