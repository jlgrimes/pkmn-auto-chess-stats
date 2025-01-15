import { ChevronsUpIcon } from 'lucide-react';
import { AbilityPower } from '../icons/ability-power';
import { AttackSpeed } from '../icons/attack-speed';
import { Shield } from '../icons/shield';
import { Poison } from '../icons/poison';
import { Attack } from '../icons/attack';
import { Protect } from '../icons/protect';

interface AbilityCellProps {
  abilityPower: number;
  description: string;
}

export const AbilityCell = (props: AbilityCellProps) => {
  return (
    <div className='flex flex-row space-x-2'>
      {props.abilityPower > 0 && <span>{props.abilityPower}</span>}
      {(props.abilityPower > 0 || props.description.includes('SPECIAL')) && (
        <AbilityPower />
      )}
      {props.description.includes('POISONNED') && <Poison />}
      {props.description.includes('PROTECT') && <Protect />}
      {props.description.includes('Increase ATK_SPEED') && (
        <div className='flex flex-row'>
          <AttackSpeed />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
      {/(Gain|Grant) \[[\dA-Za-z,]+\] SHIELD/i.test(props.description) && (
        <div className='flex flex-row'>
          <Shield />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
      {(props.description.includes(`Increase the user's ATK`) ||
        props.description.includes(`Increase ATK`)) && (
        <div className='flex flex-row'>
          <Attack />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
    </div>
  );
  if (props.abilityPower > 0) {
  }
  return props.description;
};
