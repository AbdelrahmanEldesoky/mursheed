<template>

  <va-card class="card">
    <div class=" flex justify-center">
      <form @submit.prevent="onSubmit" class="flex flex-col  w-3/4 py-9">
       <div class="w-full flex justify-between">
         <h2 class=" text-xl font-bold">
          update attracives
        </h2>
          <Dropdown v-model="langSelected" editable :options="lang" optionLabel="name" option-value="value"
                    class=" w-28 mx-3 "/>
        </div>

        <div class="">
          <label for="password">Name </label>
          <InputText v-model="attracives.name" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.name">{{error.name[0]}}</div>


        </div>
        <div class="">
          <label for="password">description </label>
          <InputText v-model="attracives.description" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.description">{{error.description[0]}}</div>


        </div>

        <div class="flex w-full justify-between">
          <div class="w-[48%]">
          <label for="password">country id </label>
          <InputNumber v-model="attracives.country_id" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.country_id">{{error.country_id[0]}}</div>

        </div>

        <div class="w-[48%]">
          <label for="password">city </label>
          <InputNumber v-model="attracives.city_id" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.city_id">{{error.city_id[0]}}</div>

        </div>
        </div>
        <div class="">
          <label for="password">lang </label>
          <InputNumber v-model="attracives.long" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.long">{{error.long[0]}}</div>

        </div>
        <div class="">
          <label for="password">late </label>
          <InputNumber v-model="attracives.lat" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.lat">{{error.lat[0]}}</div>

        </div>


        <div>
          <label >upload images</label>
          <FileUpload id="password" @uploader="handleFileUpload" accept="image/*" required="true" multiple="true"
                      :custom-upload="true" autofocus >
            <template #empty>

              <img v-if="file.value != ''" v-for="u in url " :src="u" class="w-[200px] h-[90px]  mb-3"  >

              <img v-else-if="dataEntred?.media?.length" v-for="data in dataEntred?.media" :src="data.original_url" class="w-[200px] h-[90px] mb-3">
            </template>
          </FileUpload>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.images">{{error.images[0]}}</div>


        </div>




        <Button style type="submit" label="Submit" class="mt-3 focus:ring-0 "/>
      </form>

    </div>
    <Toast/>
  </va-card>
</template>

<script setup>
import {useToast} from 'primevue/usetoast'
import axios from "axios";
import {ref, watch ,onMounted} from "vue";
import {useRoute} from "vue-router";


const toast = useToast()


  const attracives  = ref({
  name:'',
  description: '',
  country_id: '',
  city_id: '',
  long: '',
  lat: '',
  images:[]


})


const route = useRoute();
const entred = ref(0)
const file = ref('')
const url = ref([])
const error = ref('')
const dataEntred = ref({})

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const lang = ref([
  {name: 'en', value: "gb"},
  {name: 'ar', value: "sa"},
  {name: 'az', value: "az"},
  {name: 'ge', value: "ge"},
  {name: 'ru', value: "ru"},
  {name: 'tr', value: "tr"},
])


const langSelected = ref('gb')


const handleFileUpload = (e) => {
  console.log(e.files[0])
  files.value = e.files;
  file.value = e.files;

  for (let  i =0 ;i < files.value.length ; i++)
  {
    // console.log(URL.createObjectURL(files.value[i]))
    url.value.push(URL.createObjectURL(files.value[i])) ;
  }
  console.log(url.value)

};
const onSubmit = () => {

  const body = new FormData();
  for(let i=0; i<files.value.length ;i++){
    body.append('images[]', files.value[i])
  }
  // body.append("images", file.value);

  body.append("name",attracives.value.name);
  body.append("description",attracives.value.description);

  body.append("country_id",attracives.value.country_id);
  body.append("city_id",attracives.value.city_id);
  body.append("long",attracives.value.long);
  body.append("lat",attracives.value.lat);


  axios.defaults.headers.common['local'] = langSelected.value

  axios.post(`/api/attracives/${dataEntred.value.id}/update`, body).then((res) => {
    error.value=[]

    entred.value = 1
    let media= dataEntred.value.media
    dataEntred.value = res.data.attractives
    dataEntred.value.media = media
    toast.add({severity: 'success', summary: 'Successful', detail: 'attracives  Created', life: 3000})

  }).catch((el)=>{
    error.value = el.response.data.errors

    console.log(error.value)

  })

}


watch(langSelected, async (newValue, oldQuestion) => {
  console.log(dataEntred.value)

  attracives.value.name = dataEntred.value?.name[newValue]== undefined ? '' :dataEntred.value?.name[newValue]
  attracives.value.description = dataEntred.value?.description[newValue]== undefined ? '' :dataEntred.value?.description[newValue]

})

onMounted(() => {
console.log(route.params.id)
  axios.get(`/api/attracives/${route.params.id}`).then((res) => {
    console.log(res)
    attracives.value.name = res.data.attracive.name[langSelected.value]
    attracives.value.description = res.data.attracive.description[langSelected.value]
    attracives.value.country_id = res.data.attracive.country_id
    attracives.value.city_id = res.data.attracive.city_id
    attracives.value.long = res.data.attracive.long
    attracives.value.lat = res.data.attracive.lat
    dataEntred.value = res.data.attracive




    toast.add({severity: 'success', summary: 'Successful', detail: 'attracives Created', life: 3000})

  })
})


const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
  console.log(files.value)
};

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = () => {
  toast.add({severity: "info", summary: "Success", detail: "File Uploaded", life: 3000});
};


function imageUrl(file) {
  console.log(file)
  return URL.createObjectURL(file)
}

const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

</script>

<style scoped>

</style>
