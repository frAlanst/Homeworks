import { MenuItem } from '../models/menu-item';
import { NaryTree } from '../models/nary-tree';
import { Home } from '../pages/home/home';
import { Users } from '../pages/users/users';
import { UserCreate } from '../pages/user-create/user-create';
import { Reports } from '../pages/reports/reports';
import { SalesReport } from '../pages/sales-report/sales-report';
import { Settings } from '../pages/settings/settings';
import { Profile } from '../pages/profile/profile';

export function buildMenuTree(): NaryTree<MenuItem> {
    const tree = new NaryTree<MenuItem>({ title: 'Menú', link: '', component: Home });

    tree.root.addChild({ title: 'Inicio', link: 'inicio', component: Home });

    const users = tree.root.addChild({ title: 'Usuarios', link: 'usuarios', component: Users });
    users.addChild({ title: 'Crear usuario', link: 'usuarios/nuevo', component: UserCreate });

    const reports = tree.root.addChild({ title: 'Reportes', link: 'reportes', component: Reports });
    reports.addChild({ title: 'Ventas', link: 'reportes/ventas', component: SalesReport });

    const settings = tree.root.addChild({ title: 'Configuración', link: 'configuracion', component: Settings });
    settings.addChild({ title: 'Perfil', link: 'configuracion/perfil', component: Profile });

    return tree;
}

export const menuTree = buildMenuTree();