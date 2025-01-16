import { ChevronsUpIcon } from 'lucide-react';
import { AbilityPower } from '../icons/ability-power';
import { AttackSpeed } from '../icons/attack-speed';
import { Shield } from '../icons/shield';
import { Attack } from '../icons/attack';
import { HP } from '../icons/hp';
import { Defense } from '../icons/defense';
import { CritChance } from '../icons/crit-chance';
import { PP } from '../icons/pp';

interface AbilityCellProps {
  abilityPower: number;
  description: string;
}

export const AbilityCell = (props: AbilityCellProps) => {
  const shouldRenderAP =
    props.abilityPower > 0 || props.description.includes('SPECIAL');
  const shouldRenderATK =
    /((Deal|dealing|take) (\[[\dA-Za-z,]+\]|150%) (PHYSICAL|TRUE|ATK))|(% of (its )?ATK. to)/i.test(
      props.description
    );
  const shouldRenderAPNum = props.abilityPower > 0;
  return (
    <div className='flex flex-row space-x-4 '>
      {(shouldRenderAP || shouldRenderATK) && (
        <div className='flex flex-row space-x-1'>
          {shouldRenderAP && <AbilityPower />}
          {shouldRenderATK && <Attack />}
          {shouldRenderAPNum && <span>{props.abilityPower}</span>}
        </div>
      )}
      {/(Increase ATK_SPEED)|(Gain \[[\dA-Za-z,]+\]% ATK_SPEED)/i.test(
        props.description
      ) && (
        <div className='flex flex-row'>
          <AttackSpeed />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
      {(props.description.includes('critical hit') ||
        props.description.includes('CRIT_CHANCE')) && (
        <div className='flex flex-row'>
          <CritChance />
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
        props.description.includes(`Increase the ATK`) ||
        props.description.includes(`Increase the base ATK`) ||
        props.description.includes(`Increase ATK `) ||
        props.description.includes(`increase their ATK `) ||
        props.description.includes('and ATK by')) && (
        <div className='flex flex-row'>
          <Attack />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
      {/((Gain) (\[[\dA-Za-z,]+\]) DEF)|(Increase the user's DEF)/i.test(
        props.description
      ) && (
        <div className='flex flex-row'>
          <Defense />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
      {/(heal|recovers|(increase max hp by))/i.test(props.description) && (
        <div className='flex flex-row'>
          <HP />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
      {/(Increase the AP)/i.test(props.description) && (
        <div className='flex flex-row'>
          <AbilityPower />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
      {/((Restore) (\[[\dA-Za-z,=\.]+\]) PP)/i.test(props.description) && (
        <div className='flex flex-row'>
          <PP />
          <ChevronsUpIcon className='h-4 w-4' />
        </div>
      )}
      {/* {props.description.includes('POISONNED') && <Poison />}
      {props.description.includes('CURSE') && <Curse />}
      {props.description.includes('FLINCH') && <Flinch />}
      {props.description.includes('CHARM') && <Charm />}
      {props.description.includes('SLEEP') && <Sleep />}
      {props.description.includes('PROTECT') && <Protect />}
      {props.description.includes('PROTECT') && <RuneProtect />} */}
    </div>
  );
};
