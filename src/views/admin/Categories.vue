<template>
  <AdminLayout>

    <div class="page-head">

      <div>
        <h1>Categorias</h1>
        <p>Organize os produtos da loja</p>
      </div>

      <button class="add-btn">
        + Nova Categoria
      </button>

    </div>

    <div class="categories-grid">

      <div
        class="category-card"
        v-for="category in categories"
        :key="category.id"
      >

        <div class="icon">
          {{ category.icon }}
        </div>

        <h3>{{ category.name }}</h3>

        <span>
          {{ category.products }} produtos
        </span>

        <div class="actions">

          <button>
            Editar
          </button>

          <button class="delete">
            Excluir
          </button>

        </div>

      </div>

    </div>

  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const categories = ref([
  {
    id:1,
    name:'Joias',
    products:24,
    icon:'💎'
  },
  {
    id:2,
    name:'Perfumes',
    products:18,
    icon:'🧴'
  },
  {
    id:3,
    name:'Relógios',
    products:9,
    icon:'⌚'
  },
  {
    id:4,
    name:'Pingentes',
    products:13,
    icon:'📿'
  }
])
</script>

<style scoped>
.page-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:30px;
}

.page-head p{
  color:#777;
}

.add-btn{
  height:50px;
  padding:0 24px;
  border:none;
  border-radius:14px;
  background:#d4af7f;
  color:black;
  font-weight:700;
  cursor:pointer;
}

.categories-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
}

.category-card{
  background:#151515;
  border:1px solid #222;
  border-radius:24px;
  padding:30px;
  text-align:center;
}

.icon{
  width:70px;
  height:70px;
  border-radius:20px;
  background:#1f1f1f;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:30px;
  margin:auto;
  margin-bottom:20px;
}

.category-card h3{
  margin-bottom:10px;
}

.category-card span{
  color:#777;
}

.actions{
  display:flex;
  gap:10px;
  margin-top:25px;
}

.actions button{
  flex:1;
  height:42px;
  border:none;
  border-radius:12px;
  background:#222;
  color:white;
  cursor:pointer;
}

.delete{
  background:#341818 !important;
  color:#ff7675 !important;
}
</style>