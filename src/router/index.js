import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProductComponent from "../components/ProductComponent/ProductComponent";
import WalletCardComponent from "../components/WalletCardComponent/WalletCardComponent";
import FoodOrdersComponent from "../components/FoodOrdersComponent/FoodOrdersComponent";
import AccountManagement from "../components/AccountManagement/AccountManagement";
import VoucherManagement from "../components/VoucherManagement/VoucherManagement";
import StoreManagement from "../components/StoreManagement/StoreManagement";
import Statistics from "../components/StatisticComponent/Statistics";
import HomePage from "../pages/HomePage/HomePage";
import Withdraw from "../components/WithdrawMoney/WithdrawMoney";
import WithdrawDetail from "../components/WithdrawMoney Detail/WithdrawMoneyDetail";
import Transaction from "../components/Transaction/Transaction";
import Test from "../pages/Test";
export const routes = [
    {
        path: 'home',
        page: HomePage,
    },
    {
        path: 'test',
        page: Test,
    },
    {
        path: 'dashboard',
        page: AdminPage,
    },
    {
        path: 'e-wallet',
        page: WalletCardComponent,
    },
    {
        path: 'account/admin',
        page: AccountManagement,
    },
    {
        path: 'voucher/admin',
        page: VoucherManagement,
    },
    {
        path: 'product/owner',
        page: ProductComponent,
    },
    {
        path: 'order',
        page: FoodOrdersComponent,
    },
    {
        path: 'store/manage',
        page: StoreManagement,
    },
    {
        path: 'statistic',
        page: Statistics,
    },
    {
        path: 'withdraw',
        page: Withdraw,
    },
    {
        path: 'withdraw/detail',
        page: WithdrawDetail,
    },
    {
        path: 'transaction',
        page: Transaction,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
];
