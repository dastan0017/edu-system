import AdminsStore from './AdminsStore'
import AppStore from './AppStore'
import AuthStore from './AuthStore'
import BanksStore from './BanksStore'
import ReportsStore from './ReportsStore'
import CommonStore from './CommonStore'
import ReferenceBooksStore from './ReferenceBooksStore'
import TutorialsStore from './TutorialsStore'

const rootStore = {
  appStore: AppStore.create(),
  authStore: AuthStore.create(),
  adminsStore: AdminsStore.create(),
  banksStore: BanksStore.create(),
  reportsStore: ReportsStore.create(),
  commonStore: CommonStore.create(),
  referenceBooksStore: ReferenceBooksStore.create(),
  tutorialsStore: TutorialsStore.create(),
}

export { rootStore as stores }
