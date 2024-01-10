<template>

  <va-card class="card">
    <div class=" flex justify-center">
      <form @submit.prevent="onSubmit" class="flex flex-col  w-3/4 py-9">
        <h2 class="pb-4 text-center va-text-bold">
          create Accommodition
          <Dropdown v-model="langSelected" editable :options="lang" optionLabel="name" option-value="value"
                    class=" w-28 mx-3 mx-10"/>

        </h2>
        <div class="">
          <label for="password">name </label>
          <InputText v-model="accommodition.name" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.name">{{ error.name[0] }}</div>

        </div>

        <div class="">
          <label for="password">owner information </label>
          <InputText v-model="accommodition.owner_info" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.owner_info">{{ error.owner_info[0] }}</div>

        </div>

        <div class="">
          <label for="password">description </label>
          <InputText v-model="accommodition.description" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.description">{{ error.description[0] }}</div>

        </div>

        <div class="mb-5">
          <label for="password">address </label>
          <InputText v-model="accommodition.address" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.address">{{ error.address[0] }}</div>

        </div>

        <div class="flex justify-center my-5">
          <div class=" flex justify-between mt-4 w-[80%] flex-wrap">
            <div class="flex items-center">
              <label class="mx-2"> country </label>
              <Dropdown v-model="country_id" editable :options="countries" optionLabel="country"
                        option-value="country_id"
                        class=" w-48 mx-3 mx-10"/>
              <div class="mt-1 mb-5 text-red-500" v-if="error?.country_id">{{ error.country_id[0] }}</div>

            </div>
            <div class="flex items-center">
              <label class="mx-2">state </label>
              <Dropdown v-model="state_id" editable :options="states" optionLabel="state"
                        option-value="state_id"
                        class=" w-48 mx-3 mx-10"/>
              <div class="mt-1 mb-5 text-red-500" v-if="error?.state_id">{{ error.state_id[0] }}</div>

            </div>
          </div>
        </div>


        <div>
          <FileUpload id="password" @uploader="handleFileUpload" accept="image/*" required="true" multiple="true"
                      :custom-upload="true" autofocus :class="{ 'p-invalid': submitted  }">
            <template #empty>
              <img v-if="file!= ''" v-for="u in url " :src="u" class="w-[200px] h-[90px]  mb-3"  >
              <img v-else-if="dataEntred?.media?.length" v-for="data in dataEntred?.media" :src="data.original_url" class="w-[200px] h-[90px]">
            </template>
          </FileUpload>

          <div class="mt-1 mb-5 text-red-500" v-if="error?.images">{{ error.images[0] }}</div>


        </div>


        <div class=" flex justify-between mt-4">
          <div class="flex items-center">
            <label class="mx-2"> available </label>
            <InputSwitch v-model="accommodition.aval_status"/>
          </div>
          <div class="flex items-center">
            <label class="mx-2"> show detailed information in mobile </label>
            <InputSwitch v-model="accommodition.info_status"/>
          </div>
        </div>


        <Button type="submit" label="Submit" class="mt-3"/>
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

const accommodition = ref({
  name: '',
  owner_info: '',
  description: '',
  address: '',
  city_id: 1,
  aval_status: true,
  info_status: true,

})

const countries = ref([])
const states = ref([])
const country_id = ref('')
const state_id = ref('')


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
  console.log(files)
  for (let i = 0; i < files.value.length; i++) {
    body.append('images[]', files.value[i])
  }

  // body.append("images", file.value);
  body.append("name", accommodition.value.name);
  body.append("owner_info", accommodition.value.owner_info);
  body.append("description", accommodition.value.description);
  body.append("address", accommodition.value.address);
  body.append("country_id", country_id.value);
  body.append("state_id", state_id.value);
  body.append("city_id", accommodition.value.city_id);
  body.append("aval_status", accommodition.value.aval_status);
  body.append("info_status", accommodition.value.info_status);


  axios.defaults.headers.common['local'] = langSelected.value

  axios.post(`/api/accommodition/${dataEntred.value.id}/update`, body).then((res) => {
    error.value=[]

    entred.value = 1
    let media= dataEntred.value.media
    dataEntred.value = res.data.accommmodition
    dataEntred.value.media = media
    toast.add({severity: 'success', summary: 'Successful', detail: 'accommodition Updated', life: 3000})

  }).catch((el)=>{
    error.value = el.response.data.errors

    console.log(error.value)

  })

}


watch(langSelected, async (newValue, oldQuestion) => {
  console.log(dataEntred.value)

  console.log(dataEntred.value)
  if (entred.value) {
    console.log(dataEntred.value.description)

    accommodition.value.description = dataEntred.value?.description[newValue] == undefined ? '' : dataEntred.value?.description[newValue]
    accommodition.value.name = dataEntred.value?.name[newValue] == undefined ? '' : dataEntred.value?.name[newValue]
    accommodition.value.address = dataEntred.value?.address[newValue] == undefined ? '' : dataEntred.value?.address[newValue]
    accommodition.value.owner_info = dataEntred.value?.owner_info[newValue] == undefined ? '' : dataEntred.value?.owner_info[newValue]
    console.log(accommodition)
  }
})

onMounted(() => {
  axios.get(`/api/countries`).then((res) => {

    countries.value = res.data.countries
    console.log(countries.value)
  })

  axios.get(`/api/accommodition/${route.params.id}`).then((res) => {
    console.log(res.data.accommmodition)

    accommodition.value.name = res.data.accommmodition.name[langSelected.value]
    accommodition.value.owner_info = res.data.accommmodition.owner_info[langSelected.value]
    accommodition.value.description = res.data.accommmodition.description[langSelected.value]
    accommodition.value.address = res.data.accommmodition.address[langSelected.value]
    country_id.value = res.data.accommmodition.country_id
    state_id.value = res.data.accommmodition.state_id
    accommodition.value.city_id = res.data.accommmodition.city_id
    accommodition.value.aval_status = res.data.accommmodition.aval_status
    accommodition.value.info_status = res.data.accommmodition.info_status
    dataEntred.value = res.data.accommmodition

    console.log(res.data.accommmodition)


    toast.add({severity: 'success', summary: 'Successful', detail: 'Offer Created', life: 3000})

  })
})


const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};
watch(country_id, async (newValue, oldQuestion) => {
  console.log("hello ")
  axios.get(`/api/state/${newValue}`).then((res) => {

    states.value = res.data.states
    console.log(states.value )
  })

})

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
