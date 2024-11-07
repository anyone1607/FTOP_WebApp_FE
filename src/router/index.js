import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProductComponent from "../components/ProductComponent/ProductComponent";
import WalletCardComponent from "../components/WalletCardComponent/WalletCardComponent";
import ApproveInformation from "../components/ApproveInformationComponent/ApproveInformation";
import FoodOrdersComponent from "../components/FoodOrdersComponent/FoodOrdersComponent";
import AccountManagement from "../components/AccountManagement/AccountManagement";
import VoucherManagement from "../components/VoucherManagement/VoucherManagement";
import StoreManagement from "../components/StoreManagement/StoreManagement";
import Statistics from "../components/StatisticComponent/Statistics";
import FeedBack from "../components/FeedBackComponent/FeedBack";
import Transaction from "../components/Transaction/Transaction";
import MyProfile from "../components/MyProfileComponent/MyProfile";

export const routes = [
    {
        path: '/auth/system/login',
        page: LoginPage,
    },
    {
        path: '/auth/system/register',
        page: RegisterPage,
    },
    {
        path: '/',
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
        path: 'approve/manage',
        page: ApproveInformation,
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
        path: 'feedback/manage',
        page: FeedBack,
    },
    {
        path: 'transaction',
        page: Transaction,
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
