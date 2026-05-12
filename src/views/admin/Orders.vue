<template>
  <AdminLayout>

    <div class="page-head">

      <div>
        <h1>Pedidos</h1>
        <p>Controle todos os pedidos realizados</p>
      </div>

    </div>

    <div class="table-wrapper">

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Status</th>
            <th>Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="order in orders"
            :key="order.id"
          >

            <td>#{{ order.id }}</td>

            <td>{{ order.customer }}</td>

            <td>R$ {{ order.total }}</td>

            <td>
              <span
                class="status"
                :class="order.status"
              >
                {{ order.status }}
              </span>
            </td>

            <td>
              {{ order.payment }}
            </td>

            <td class="actions">

              <button>
                Ver
              </button>

              <button class="delete">
                Cancelar
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

const orders = ref([
  {
    id:1024,
    customer:'Maria Eduarda',
    total:820,
    payment:'PIX',
    status:'pending'
  },
  {
    id:1025,
    customer:'Ana Clara',
    total:1290,
    payment:'Cartão',
    status:'approved'
  },
  {
    id:1026,
    customer:'Juliana',
    total:430,
    payment:'PIX',
    status:'delivered'
  }
])
</script>

<style scoped>
.page-head{
  margin-bottom:30px;
}

.page-head p{
  color:#777;
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

.status{
  padding:8px 14px;
  border-radius:999px;
  font-size:12px;
  text-transform:capitalize;
}

.pending{
  background:#3d3117;
  color:#fbc531;
}

.approved{
  background:#1f3b2d;
  color:#4cd137;
}

.delivered{
  background:#192a56;
  color:#74b9ff;
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