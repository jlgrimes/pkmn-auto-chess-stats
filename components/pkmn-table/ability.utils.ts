function extractBracketedData(text: string): string[] {
  // Define the regex pattern to match bracketed data ending with "] SPECIAL"
  const regex = /\[([^\]]*?)\]\sSPECIAL/g;
  const matches: string[] = [];
  let match;

  // Use regex.exec to capture all matches
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]); // Add the captured group to the results
  }

  return matches;
}

function computeAbilityPower(description: string, tier: number) {
  if (description.includes('] SPECIAL')) {
    let apArr = extractBracketedData(description)[0];
    apArr = apArr.replace(',SP', '');
    apArr = apArr.replace(', SP', '');

    try {
      const parsedApArr = JSON.parse(`[${apArr}]`) as string[];
      const idx = parsedApArr.length > 1 ? tier - 1 : 0;
      const APAsInt = parseInt(parsedApArr[idx]);

      if (isNaN(APAsInt)) return 0;
      return APAsInt;
    } catch (error) {
      console.log(description);
      console.log(apArr);
      console.error(error);
      return 0;
    }
  }

  return 0;
}

export const getAbilityPower = (
  translations: Record<string, Record<string, string>>,
  name: string,
  tier: number
) => {
  const abilityDescription = translations['ability_description'][name];
  const abilityPower = computeAbilityPower(abilityDescription, tier);

  return abilityPower;
};
