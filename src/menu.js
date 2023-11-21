import { isCan } from '@/tools'

const store = {
  namespaced: true,
  getters: {
    // eslint-disable-next-line
    instansi_id(state, getters, rootState, rootGetters) {
      const i = rootGetters['instansi/instansi_aktif']
      return i ? i.id : null
    },
    is_admin(state, getters, rootState, rootGetters) {
      const i = rootGetters['user/user']
      return i.is_super_admin ? true : false
    },
    // eslint-disable-next-line
    menus(state, getters, rootState, rootGetters) {
      return [
        {
          icon: 'mdi-home-city-outline',
          title: 'Profil',
          to: {
            name: 'instansi.detail',
            params: {
              instansi_id: getters['instansi_id'] || 0,
            },
          },
          hidden: false,
        },
        {
          icon: 'mdi-google-classroom',
          title: 'Kelasku',
          to: {
            name: 'kelasku',
            params: {
              instansi_id: getters['instansi_id'],
            },
          },
          hidden: false,
        },
        {
          icon: 'mdi-file-document-multiple',
          title: 'Ajuanku',
          to: {
            name: 'ajuan.me',
            params: {
              instansi_id: getters['instansi_id'],
            },
          },

          hidden: true,
        },
        {
          subheader: true,
          title: 'Kelola',
          hidden: !isCan('read-pengguna'),
        },
        {
          icon: 'mdi-google-classroom',
          title: 'Kelas',
          hidden: !isCan('read-kelas'),
          items: [
            {
              icon: 'mdi-book',
              title: 'Mata Pelajaran',
              to: {
                name: 'mapel',
                params: {
                  instansi_id: getters['instansi_id'],
                },
              },
              hidden: !isCan('read-mapel'),
            },
            {
              icon: 'mdi-account-group',
              title: 'Rombongan Belajar',
              to: {
                name: 'rombel',
                params: {
                  instansi_id: getters['instansi_id'],
                },
              },
              hidden: !isCan('read-rombel'),
            },
            {
              icon: 'mdi-google-classroom',
              title: 'Kelas',
              to: {
                name: 'kelas',
                params: {
                  instansi_id: getters['instansi_id'],
                },
              },

              hidden: !isCan('read-kelas'),
            },
          ],
        },

        {
          icon: 'mdi-account-supervisor-circle-outline',
          title: 'Pengguna',
          to: {
            name: 'pengguna',
            params: {
              instansi_id: getters['instansi_id'],
            },
          },
          hidden: !isCan('read-pengguna'),
        },

        {
          icon: 'mdi-account-key',
          title: 'Hak Akses',
          to: {
            name: 'akses',
            params: {
              instansi_id: getters['instansi_id'],
            },
          },
          hidden: !isCan('read-peran'),
        },
        {
          icon: 'mdi-file-edit',
          title: 'Ajuan Data Siswa',
          to: {
            name: 'ajuan',
            params: {
              instansi_id: getters['instansi_id'],
            },
          },
          hidden: true,
        },
        {
          icon: 'mdi-school',
          title: 'Data Siswa',
          to: {
            name: 'siswappdb',
            params: {
              instansi_id: getters['instansi_id'],
            },
          },
          hidden: !isCan('read-usermeta'),
        },
      ]
    },
  },
}

export default store
