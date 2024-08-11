import supabase, { supabaseUrl } from "./supabase";

export async function getAllCabins() {
  let { data: Cabins, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return Cabins;
}

export async function createCabin(newCabin) {
  
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;



  //1. crate new cabin
 
const { data, error } = await supabase
.from('Cabins')
.insert([
  { ...newCabin, image: imagePath },
])
.select().single()

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }



  //2. uploade photo
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    throw new Error("Photo could not be uploaded and cabin is not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
}
