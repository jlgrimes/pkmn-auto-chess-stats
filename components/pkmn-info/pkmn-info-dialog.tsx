import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PokemonMetaSheet } from './pkmn-meta-sheet';
import { usePokemonMeta } from '../../lib/hooks/pkmn-meta.hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/lib/hooks/translations.hooks';
import { PokemonTableEntry } from '../pkmn-table/pkmn-table.types';
import { Row } from '@tanstack/react-table';
import { Alert, AlertDescription } from '../ui/alert';

interface PokemonInfoDialogProps {
  pokemon: Row<PokemonTableEntry> | undefined;
  setPokemon: (pkmn: Row<PokemonTableEntry> | undefined) => void;
}

export const PokemonInfoDialog = (props: PokemonInfoDialogProps) => {
  const { data: translations } = useTranslations();
  // to get it to "preload" the SWR hook
  usePokemonMeta('');

  const pokemonName = props.pokemon?.getValue('name') as string;
  const passiveData = props.pokemon?.getValue('name')
    ? translations?.['passive_description']?.[
        pokemonName.toUpperCase()
      ]?.replaceAll(`$t(pkm.${pokemonName.toUpperCase()})`, pokemonName)
    : null;

  return (
    <Dialog
      open={!!props.pokemon}
      onOpenChange={open => !open && props.setPokemon(undefined)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.pokemon?.getValue('name')}</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        {props.pokemon && (
          <Tabs defaultValue='info'>
            <TabsList>
              <TabsTrigger value='info'>Info</TabsTrigger>
              <TabsTrigger value='usage'>Usage</TabsTrigger>
            </TabsList>
            <TabsContent value='info'>
              <div className='space-y-2'>
                {passiveData && (
                  <Alert>
                    <AlertDescription>{passiveData}</AlertDescription>
                  </Alert>
                )}
                <div>
                  <div>
                    Ability -{' '}
                    {
                      translations?.['ability'][
                        props.pokemon.getValue('abilityName') as string
                      ]
                    }
                  </div>
                  <div>{props.pokemon.getValue('abilityDescription')}</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value='usage'>
              <PokemonMetaSheet
                pokemon={props.pokemon.getValue('name') as string}
              />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
