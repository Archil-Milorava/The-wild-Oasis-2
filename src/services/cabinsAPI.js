import supabase, {supabaseUrl} from "./supabase";

export async function getAllCabins() {
  let { data: Cabins, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return Cabins;
}

export async function addCabin(newCabin) {
// https://tkosyqnvtqnlbizalhro.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

// https://tkosyqnvtqnlbizalhro.supabase.co/storage/v1/object/public/cabin-images/

//https:/tkosyqnvtqnlbizalhro.supabase.co/storage/v1/object/public/cabin-images/0.005792674375049156-1.jpg


const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;


  //1. crate new cabin
  const { data, error } = await supabase
    .from("Cabins")
    .insert([{...newCabin, image: imagePath}])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

//2. uploade photo
const {  error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image )

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
}
