import supabase from "./supabase";

export async function getSettings() {

  let { data: Settings, error } = await supabase
  .from('Settings')
  .select('*')

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return Settings;
}

export async function updateSetting(newSetting) {
  
const { data, error } = await supabase
.from('Settings')
.update(newSetting )
.eq('id', 1)
.select()



  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
