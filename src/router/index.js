import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProductComponent from "../components/ProductComponent/ProductComponent";
import WalletCardComponent from "../components/WalletCardComponent/WalletCardComponent";
import FoodOrdersComponent from "../components/FoodOrdersComponent/FoodOrdersComponent";
import AccountManagement from "../components/AccountManagement/AccountManagement";
import VoucherManagement from "../components/VoucherManagement/VoucherManagement";
import StoreManagement from "../components/StoreManagement/StoreManagement";
import Statistics from "../components/StatisticComponent/Statistics";
import Home from "../pages/HomePage/Home";
import ZaloPay from "../pages/ZaloPay/ZaloPay";
import MyProfile from "../components/MyProfileComponent/MyProfile"
export const routes = [
    {
        path: 'home',
        page: Home,
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
        path :'zalopay',
        page: ZaloPay
    },
    {
        path: '*',
        page: NotFoundPage,
    },
    {
        path :'my-profile',
        page: MyProfile
    },

      
];
