import supabase from "./supabase";

export async function getAllCabins() {
  let { data: Cabins, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return Cabins;
}

export async function addCabin(newCabin) {
  const { data, error } = await supabase
    .from("Cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
}
