import * as assetService from '../../assets/services/asset.service';
import { Asset } from "../../assets/models/asset.model";
import { Composite } from "../../assets/models/composite.model";
import { IOperatorNotifications, OperatorNotifications } from "../models/operator-notifications.model";
import * as componentService from '../../assets/services/component.service';
import { Profile } from '../../profile/models/profile.model';






export const saveOperatorNotifications = async (operatorNotifications: IOperatorNotifications): Promise<OperatorNotifications> => {
    try {
        const { asset, component, ...notificationData } = operatorNotifications;

        // Crear una nueva instancia de OperatorNotifications con los datos proporcionados
        const newNotification = new OperatorNotifications(notificationData);

        // Guardar la notificación sin las relaciones primero
        await newNotification.save();

        // Asignarle el Asset
        if (asset && asset.assetId) {
            const assetInstance = await Asset.findByPk(asset.assetId);
            if (assetInstance) {
                await newNotification.$set('asset', assetInstance);
            } else {
                throw 'El activo no existe';
            }
        }

        // Asignarle el Componente
        if (component && component.compositeId) {
            const compositeInstance = await Composite.findByPk(component.compositeId);
            if (compositeInstance) {
                await newNotification.$set('component', compositeInstance);
            } else {
                throw 'El componente no existe';
            }
        }

        // Guardar la notificación nuevamente con las relaciones
        await newNotification.save();

        return newNotification;
    } catch (error) {
        return Promise.reject(error);
    }
};


export const getOperatorNotifications = async (): Promise<OperatorNotifications[]> => {
    try {
        return OperatorNotifications.findAll({
            include: [
                { model: Composite, },
                { model: Asset, },
            ]
        });
    } catch (e) {

        return Promise.reject(e);
    }
}

export const getComponentNotifications = async (compositeId: number): Promise<OperatorNotifications[]> => {
    try {
        return OperatorNotifications.findAll({
            include: [
                { model: Composite, where:{compositeId: compositeId}},
                { model: Asset, },
            ]
        });
    } catch (e) {

        return Promise.reject(e);
    }
}


export const getOperatorNotification = async (
    operatorNotificationsId: number
): Promise<OperatorNotifications | null> => {
    return OperatorNotifications.findByPk(operatorNotificationsId, {
        include: [
            { model: Asset },
            { model: Composite }
        ],
    });
};


// export const getOperatorNotification = async (operatorNotificationsId: number): Promise<OperatorNotifications | null> => {
//     try {
//         const operatorNotification = await OperatorNotifications.findByPk(operatorNotificationsId, {
//             include: [
//                 { model: Composite },
//                 { model: Asset, },
//             ]
//         });

//         return operatorNotification || null; // Asegúrate de devolver null en caso de que no se encuentre la notificación
//     } catch (e) {
//         console.error('Error al obtener la notificación del operador:', e);
//         throw e;  // Lanza el error para que pueda ser manejado en el lugar donde se llama a esta función
//     }
// };