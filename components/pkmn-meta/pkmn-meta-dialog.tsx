import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PokemonMetaSheet } from './pkmn-meta-sheet';
import { usePokemonMeta } from './pkmn-meta.hooks';

interface PokemonMetaDialogProps {
  pokemon: string | undefined;
  setPokemon: (pkmn: string | undefined) => void;
}

export const PokemonMetaDialog = (props: PokemonMetaDialogProps) => {
  // to get it to "preload" the SWR hook
  usePokemonMeta('');

  return (
    <Dialog
      open={!!props.pokemon}
      onOpenChange={open => !open && props.setPokemon(undefined)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <PokemonMetaSheet pokemon={props.pokemon ?? ''} />
      </DialogContent>
    </Dialog>
  );
};
