<template>
  <AdminLayout>

    <div class="page-head">

      <div>
        <h1>Usuários</h1>
        <p>Clientes cadastrados na plataforma</p>
      </div>

      <button class="add-btn">
        + Novo Usuário
      </button>

    </div>

    <div class="table-wrapper">

      <table>

        <thead>

          <tr>
            <th>Usuário</th>
            <th>Email</th>
            <th>Pedidos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>

        </thead>

        <tbody>

          <tr
            v-for="user in users"
            :key="user.id"
          >

            <td class="user">

              <div class="avatar">
                {{ user.name[0] }}
              </div>

              {{ user.name }}

            </td>

            <td>
              {{ user.email }}
            </td>

            <td>
              {{ user.orders }}
            </td>

            <td>

              <span
                class="status"
                :class="user.active ? 'active' : 'inactive'"
              >
                {{ user.active ? 'Ativo' : 'Bloqueado' }}
              </span>

            </td>

            <td class="actions">

              <button>
                Editar
              </button>

              <button class="delete">
                Remover
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const users = ref([
  {
    id:1,
    name:'Maria Eduarda',
    email:'maria@gmail.com',
    orders:12,
    active:true
  },
  {
    id:2,
    name:'Ana Clara',
    email:'ana@gmail.com',
    orders:4,
    active:true
  },
  {
    id:3,
    name:'Juliana Souza',
    email:'juliana@gmail.com',
    orders:0,
    active:false
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

.table-wrapper{
  background:#151515;
  border:1px solid #222;
  border-radius:24px;
  overflow:hidden;
}

table{
  width:100%;
  border-collapse:collapse;
}

thead{
  background:#1b1b1b;
}

th{
  text-align:left;
  padding:20px;
  color:#777;
}

td{
  padding:20px;
  border-top:1px solid #222;
}

.user{
  display:flex;
  align-items:center;
  gap:14px;
}

.avatar{
  width:45px;
  height:45px;
  border-radius:50%;
  background:#d4af7f;
  color:black;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
}

.status{
  padding:8px 14px;
  border-radius:999px;
  font-size:12px;
}

.active{
  background:#1f3b2d;
  color:#4cd137;
}

.inactive{
  background:#341818;
  color:#ff7675;
}

.actions{
  display:flex;
  gap:10px;
}

.actions button{
  height:40px;
  padding:0 18px;
  border:none;
  border-radius:10px;
  background:#222;
  color:white;
  cursor:pointer;
}

.delete{
  background:#341818 !important;
  color:#ff7675 !important;
}
</style>