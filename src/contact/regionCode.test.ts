import { expect } from 'chai';
import 'mocha';
import { getRegionCodeFromRegionName, isRegionCodeValid } from './regionCode';

interface RegionCodeAssertion {
  input: {
    countryCode?: string;
    regionName?: string;
  };
  output: string;
}

interface RegionCodeValidationAssertion {
  input: {
    countryCode?: string;
    regionCode?: string;
  };
  output: boolean;
}

const regionCodeTests: RegionCodeAssertion[] = [
  {
    input: {
      countryCode: 'US',
      regionName: 'South Carolina',
    },
    output: 'SC',
  },
  {
    input: {
      countryCode: 'unknown',
      regionName: 'California',
    },
    output: '',
  },
  {
    input: {
      countryCode: 'US',
      regionName: 'unknown',
    },
    output: '',
  },
  {
    input: {},
    output: '',
  },
];

const regionCodeValidationTests: RegionCodeValidationAssertion[] = [
  {
    input: {
      countryCode: 'US',
      regionCode: 'PA',
    },
    output: true,
  },
  {
    input: {
      countryCode: 'US',
      regionCode: '44',
    },
    output: false,
  },
  {
    input: {},
    output: false,
  },
  {
    input: {
      countryCode: 'unknown',
      regionCode: 'PA',
    },
    output: false,
  },
];

describe('region code suite', () => {
  regionCodeTests.forEach((test) => {
    const { countryCode, regionName } = test.input;
    it(`converts "${countryCode}" "${regionName}" to "${test.output}"`, () => {
      const result = getRegionCodeFromRegionName(countryCode, regionName);
      expect(result).to.equal(test.output);
    });
  });

  regionCodeValidationTests.forEach((test) => {
    const { countryCode, regionCode } = test.input;
    it(`returns ${test.output} for "${countryCode}" "${regionCode}"`, () => {
      const result = isRegionCodeValid(countryCode, regionCode);
      expect(result).to.equal(test.output);
    });
  });
});
