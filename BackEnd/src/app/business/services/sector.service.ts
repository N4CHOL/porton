import { Sector, ISector } from '../models/sector.model';
import { Unit } from '../models/unit.model';

export const findAllSectors = async () => {

}

export const findSectorById = async (sectorId: number): Promise<Sector | null> => {
    return Sector.findByPk(sectorId);
}

export const saveSector = async (businessId: number, unitId: number, sector: ISector): Promise<Sector | null> => {
    let unit: Unit | null = await Unit.findByPk(unitId);

    if (!unit) return null;

    const newSector: Sector = new Sector({ sector });
    const sec: Sector = await newSector.save();

    unit.addSector(sec);
    await unit.save();

    return sec;
}

export const updateSector = async (sec: ISector): Promise<Sector | null> => {
    let sector: Sector | null = await Sector.findByPk(sec.sectorId);

    if (!sector) return null;

    sector = updateSectorValues(sector, sec);
    return sector.save();
}

const updateSectorValues = (original: Sector, target: ISector): Sector => {
    original.name = target.name ? target.name : original.name;
    original.number = target.number ? target.number : original.number;
    original.internalNumber = target.internalNumber ? target.internalNumber : original.internalNumber;
    return original;
}