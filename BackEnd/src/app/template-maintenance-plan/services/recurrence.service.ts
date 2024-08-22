import { Recurrence, IRecurrence } from '../models/recurrence.model';

export const getRecurrence = async (recurrence: IRecurrence): Promise<Recurrence | null> => {
    try {
        if (!recurrence.recurrenceId) throw 'La recurrencia no tiene ID';
        return Recurrence.findByPk(recurrence.recurrenceId);
    } catch (e) {
        return Promise.reject(e);
    }
}

export const saveRecurrence = async (recurrence: IRecurrence): Promise<Recurrence> => {
    
    const newRecurrence: Recurrence = new Recurrence({...recurrence});
    try {
        if (!newRecurrence.dateHourStarted) throw 'No hay fecha de inicio';
        if (!newRecurrence.amountOfDays) throw 'No hay cantidad de días';
        
        let recurrenceSaved: Recurrence = await newRecurrence.save();

        return recurrenceSaved;
    } catch (e) {
        return Promise.reject(e); 
    }
}

export const editRecurrence = async (recurrence: IRecurrence): Promise<Recurrence> => {
    try {
        if (!recurrence.dateHourStarted) throw 'No hay fecha de inicio';
        if (!recurrence.amountOfDays) throw 'No hay cantidad de días';
        if (!recurrence.recurrenceId) throw 'La recurrencia para editar no tiene ID';

        let updateRecurrence: Recurrence | null = await Recurrence.findByPk(recurrence.recurrenceId);
        if (!updateRecurrence) throw 'No se encontró la recurrencia';
        await updateRecurrence.update(recurrence)
        
        return updateRecurrence 
    } catch (e) {
        return Promise.reject(e);
    }
}

export const removeRecurrence = async (recurrence: IRecurrence): Promise<void> => {
    try {
        if (!recurrence.recurrenceId) throw 'La recurrencia no tiene id';
        const deleteRecurrence: Recurrence | null = await Recurrence.findByPk(recurrence.recurrenceId);
        if (!deleteRecurrence) throw 'No se encontró la recurrencia';
        return deleteRecurrence.destroy();
    } catch (e) {
        return Promise.reject(e);
    }
}