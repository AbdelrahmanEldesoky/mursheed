<template>
   <div class="grid">
    <div class="col-12 h-full ">
      <va-card class="card m-auto">

        <Toast/>
          <div class="lg:w-[80%] mx-auto py-8" >
            <div><h2 class="text-2xl font-bold py-5">Reminding Users</h2></div>
            <div class="card w-full mx-auto py-4">
              <p class="text-xl font-bold">Subject</p>
              <InputText type="text" class="w-full py-4 "  />
            </div>
            <div class="card w-full mx-auto py-4">
              <p class="text-xl font-bold">User Type</p>
              <div class="card flex justify-content-center">
                 <Dropdown v-model="selectedCity" :options="user" optionLabel="name" placeholder="user type" class="w-full py-1 " />
              </div>
            </div>
            <div class="card w-full mx-auto py-4">
              <p class="text-xl font-bold">Content</p>
              <Textarea v-model="value" rows="5" cols="30" class="w-full py-1" />
            </div>
            <div class="w-full text-center">  <Button @click="Reminding()"  label="Send" class="mt-3 mx-auto lg:w-[10%]" /></div>
          </div>
      </va-card>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const selectedCity = ref();
const user = ref([
    { name: 'tourist', code: 'tr' },
    { name: 'drivers', code: 'dv' },
    { name: 'guides', code: 'gd' },
    { name: 'All', code: 'all' },

]);
const Reminding =()=>{
  axios
    .post('/api/country-price/create',user.value)
    .then((res) => {

      toast.add({severity: 'success', summary: 'Successful', detail: 'price Created', life: 3000})

    })
    .catch((el)=>{
      error.value = el.response.data.errors
    })
}
</script>
