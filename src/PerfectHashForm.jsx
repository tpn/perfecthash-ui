import React, { useState, useEffect, useRef } from 'react';

import ReactMarkdown from 'react-markdown';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useImmer } from 'use-immer';

import { z } from 'zod';

// Helper function to format the current date and time
const getCurrentDateTimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

const formSchema = z.object({
  advancedOptions: z.boolean(),
  uncommonOptions: z.boolean(),
  platform: z.enum(['Windows', 'Linux']),
  exeType: z.enum(['Create', 'Bulk Create']),
  keysPath: z.string(),
  keysDirectory: z.string(),
  outputDirectory: z.string(),
  algorithm: z.enum(['Chm01']),
  hashFunction: z.enum([
    'Crc32Not',
    'Crc32RotateWXYZ',
    'Crc32RotateX',
    'Crc32RotateXY',
    'Crc32RotateXor',
    'Djb',
    'DjbXor',
    'Dummy',
    'Fnv',
    'Jenkins',
    'Multiply',
    'Multiply643ShiftR',
    'Multiply644ShiftR',
    'MultiplyRotateLR',
    'MultiplyRotateR',
    'MultiplyRotateR2',
    'MultiplyRotateRMultiply',
    'MultiplyShiftLR',
    'MultiplyShiftR',
    'MultiplyShiftR2',
    'MultiplyShiftRMultiply',
    'MultiplyShiftRX',
    'MultiplyXor',
    'RotateMultiplyXorRotate',
    'RotateMultiplyXorRotate2',
    'RotateRMultiply',
    'RotateRMultiplyRotateR',
    'RotateXor',
    'Scratch',
    'ShiftMultiplyXorShift',
    'ShiftMultiplyXorShift2',
  ]),
  maskFunction: z.enum(['And']),
  maxConcurrency: z.number().int().min(1).max(127),
  skipTestAfterCreate: z.boolean(),
  compile: z.boolean(),
  tryLargePagesForKeysData: z.boolean(),
  skipKeysVerification: z.boolean(),
  disableImplicitKeyDownsizing: z.boolean(),
  tryInferKeySizeFromKeysFilename: z.boolean(),
  findBestGraph: z.boolean(),
  silent: z.boolean(),
  quiet: z.boolean(),
  noFileIo: z.boolean(),
  paranoid: z.boolean(),
  skipGraphVerification: z.boolean(),
  disableCsvOutputFile: z.boolean(),
  omitCsvRowIfTableCreateFailed: z.boolean(),
  omitCsvRowIfTableCreateSucceeded: z.boolean(),
  indexOnly: z.boolean(),
  useRwsSectionForTableValues: z.boolean(),
  useNonTemporalAvx2Routines: z.boolean(),
  clampNumberOfEdges: z.boolean(),
  useOriginalSeededHashRoutines: z.boolean(),
  doNotHashAllKeysFirst: z.boolean(),
  enableWriteCombineForVertexPairs: z.boolean(),
  removeWriteCombineAfterSuccessfulHashKeys: z.boolean(),
  tryLargePagesForVertexPairs: z.boolean(),
  tryLargePagesForGraphEdgeAndVertexArrays: z.boolean(),
  tryLargePagesForGraphTableData: z.boolean(),
  usePreviousTableSize: z.boolean(),
  includeNumberOfTableResizeEventsInOutputPath: z.boolean(),
  includeNumberOfTableElementsInOutputPath: z.boolean(),
  rngUseRandomStartSeed: z.boolean(),
  doNotTryUseAvx2HashFunction: z.boolean(),
  tryUseAvx512HashFunction: z.boolean(),
  doNotTryUseAvx2MemoryCoverageFunction: z.boolean(),
  doNotIncludeKeysInCompiledDll: z.boolean(),
  disableSavingCallbackTableValues: z.boolean(),
  doNotTryUseHash16Impl: z.boolean(),
  tryUsePredictedAttemptsToLimitMaxConcurrency: z.boolean(),
  graphImpl: z.enum(['1', '2', '3']),
  valueSizeInBytes: z.enum(['4', '8']),
  mainWorkThreadpoolPriority: z.enum(['Low', 'Normal', 'High']),
  fileWorkThreadpoolPriority: z.enum(['Low', 'Normal', 'High']),
  attemptsBeforeTableResize: z.number().int().min(0),
  maxNumberOfTableResizes: z.number().int().min(0),
  initialNumberOfTableResizes: z.number().int().min(0),
  autoResizeWhenKeysToEdgesRatioExceeds: z.number().min(0).max(1),
  bestCoverageAttempts: z.number().int().min(0),
  bestCoverageType: z.enum([
    'HighestMaxAssignedPerCacheLineCount',
    'HighestMaxGraphTraversalDepth',
    'HighestNumberOfCollisionsDuringAssignment',
    'HighestNumberOfEmptyCacheLines',
    'HighestNumberOfEmptyLargePages',
    'HighestNumberOfEmptyPages',
    'HighestNumberOfEmptyVertices',
    'HighestNumberOfUsedCacheLines',
    'HighestNumberOfUsedLargePages',
    'HighestNumberOfUsedPages',
    'HighestPredictedNumberOfFilledCacheLines',
    'HighestRank',
    'HighestScore',
    'HighestSlope',
    'HighestTotalGraphTraversals',
    'LowestMaxAssignedPerCacheLineCount',
    'LowestMaxGraphTraversalDepth',
    'LowestNumberOfCollisionsDuringAssignment',
    'LowestNumberOfEmptyCacheLines',
    'LowestNumberOfEmptyLargePages',
    'LowestNumberOfEmptyPages',
    'LowestNumberOfEmptyVertices',
    'LowestNumberOfUsedCacheLines',
    'LowestNumberOfUsedLargePages',
    'LowestNumberOfUsedPages',
    'LowestPredictedNumberOfFilledCacheLines',
    'LowestRank',
    'LowestScore',
    'LowestSlope',
    'LowestTotalGraphTraversals',
    'HighestMaxAssignedPerCacheLineCountForKeysSubset',
    'HighestNumberOfCacheLinesUsedByKeysSubset',
    'HighestNumberOfLargePagesUsedByKeysSubset',
    'HighestNumberOfPagesUsedByKeysSubset',
    'LowestMaxAssignedPerCacheLineCountForKeysSubset',
    'LowestNumberOfCacheLinesUsedByKeysSubset',
    'LowestNumberOfLargePagesUsedByKeysSubset',
    'LowestNumberOfPagesUsedByKeysSubset',
  ]),
  maxNumberOfEqualBestGraphs: z.number().int().min(0),
  minNumberOfKeysForFindBestGraph: z.number().int().min(0),
  bestCoverageTargetValue: z.union([z.string(), z.number()]),
  keysSubset: z.string(),
  targetNumberOfSolutions: z.number().int().min(0),
  fixedAttempts: z.number().int().min(0),
  seeds: z.string(),
  seed3Byte1MaskCounts: z.string(),
  seed3Byte2MaskCounts: z.string(),
  solutionsFoundRatio: z.number(),
  rng: z.enum(['Philox43210', 'System']),
  rngSeed: z.string(),
  rngSubsequence: z.number().int(),
  rngOffset: z.number().int(),
  maxSolveTimeInSeconds: z.number().int(),
  functionHookCallbackDllPath: z.string(),
  functionHookCallbackFunctionName: z.string(),
  functionHookCallbackIgnoreRip: z.number().int(),
  remark: z.string(),
});

const initialFormStateGeneric = {
  advancedOptions: true,
  exeType: 'Create',
  algorithm: 'Chm01',
  hashFunction: 'MultiplyShiftR',
  maskFunction: 'And',
  maxConcurrency: '0',
  skipTestAfterCreate: false,
  compile: false,
  tryLargePagesForKeysData: false,
  skipKeysVerification: false,
  disableImplicitKeyDownsizing: false,
  tryInferKeySizeFromKeysFilename: false,
  findBestGraph: false,
  silent: false,
  quiet: false,
  noFileIo: false,
  paranoid: false,
  skipGraphVerification: false,
  disableCsvOutputFile: false,
  omitCsvRowIfTableCreateFailed: false,
  omitCsvRowIfTableCreateSucceeded: false,
  indexOnly: false,
  doNotUseRwsSectionForTableValues: false,
  useNonTemporalAvx2Routines: false,
  clampNumberOfEdges: false,
  useOriginalSeededHashRoutines: false,
  doNotHashAllKeysFirst: false,
  enableWriteCombineForVertexPairs: false,
  removeWriteCombineAfterSuccessfulHashKeys: false,
  tryLargePagesForVertexPairs: false,
  tryLargePagesForGraphEdgeAndVertexArrays: false,
  tryLargePagesForGraphTableData: false,
  usePreviousTableSize: false,
  includeNumberOfTableResizeEventsInOutputPath: false,
  includeNumberOfTableElementsInOutputPath: false,
  rngUseRandomStartSeed: false,
  doNotTryUseAvx2HashFunction: false,
  tryUseAvx512HashFunction: false,
  doNotTryUseAvx2MemoryCoverageFunction: false,
  doNotIncludeKeysInCompiledDll: false,
  disableSavingCallbackTableValues: false,
  doNotTryUseHash16Impl: false,
  tryUsePredictedAttemptsToLimitMaxConcurrency: false,
  graphImpl: 3,
  valueSizeInBytes: 4,
  mainWorkThreadpoolPriority: 'Normal',
  fileWorkThreadpoolPriority: 'Normal',
  attemptsBeforeTableResize: null,
  maxNumberOfTableResizes: 5,
  initialNumberOfTableResizes: 0,
  autoResizeWhenKeysToEdgesRatioExceeds: 0.0,
  bestCoverageAttempts: 5,
  bestCoverageType: 'HighestScore',
  maxNumberOfEqualBestGraphs: 3,
  minNumberOfKeysForFindBestGraph: 512,
  bestCoverageTargetValue: null,
  keysSubset: null,
  targetNumberOfSolutions: null,
  fixedAttempts: null,
  seeds: null,
  seed3Byte1MaskCounts: null,
  solutionsFoundRatio: null,
  rng: 'Philox43210',
  rngSeed: '0x2019090319811025',
  rngSubsequence: 0,
  rngOffset: 0,
  maxSolveTimeInSeconds: null,
  functionHookCallbackDllPath: null,
  functionHookCallbackFunctionName: 'InterlockedIncrement',
  functionHookCallbackIgnoreRip: null,
  remark: '',
};

const initialFormStateWindows = {
  ...initialFormStateGeneric,
  platform: 'Windows',
  keysPath: 'c:\\src\\perfecthash-keys\\sys32\\HologramWorld-31016.keys',
  keysDirectory: 'c:\\src\\perfecthash-keys\\sys32',
  outputDirectory: 'c:\\Temp\\ph.out',
};

const initialFormStateLinux = {
  ...initialFormStateGeneric,
  platform: 'Linux',
  keysPath: '~/src/perfecthash-keys/sys32/HologramWorld-31016.keys',
  keysDirectory: '~/src/perfecthash-keys/sys32',
  outputDirectory: '~/tmp/ph.out',
};

const generateCommand = (formState) => {
  const {
    advancedOptions,
    uncommonOptions,
    platform,
    exeType,
    keysPath,
    keysDirectory,
    outputDirectory,
    algorithm,
    hashFunction,
    maskFunction,
    maxConcurrency,
    skipTestAfterCreate,
    compile,
    tryLargePagesForKeysData,
    skipKeysVerification,
    disableImplicitKeyDownsizing,
    tryInferKeySizeFromKeysFilename,
    silent,
    quiet,
    noFileIo,
    paranoid,
    skipGraphVerification,
    disableCsvOutputFile,
    omitCsvRowIfTableCreateFailed,
    omitCsvRowIfTableCreateSucceeded,
    indexOnly,
    doNotUseRwsSectionForTableValues,
    useNonTemporalAvx2Routines,
    clampNumberOfEdges,
    useOriginalSeededHashRoutines,
    doNotHashAllKeysFirst,
    enableWriteCombineForVertexPairs,
    removeWriteCombineAfterSuccessfulHashKeys,
    tryLargePagesForVertexPairs,
    tryLargePagesForGraphEdgeAndVertexArrays,
    tryLargePagesForGraphTableData,
    usePreviousTableSize,
    includeNumberOfTableResizeEventsInOutputPath,
    includeNumberOfTableElementsInOutputPath,
    rngUseRandomStartSeed,
    doNotTryUseAvx2HashFunction,
    tryUseAvx512HashFunction,
    doNotTryUseAvx2MemoryCoverageFunction,
    doNotIncludeKeysInCompiledDll,
    disableSavingCallbackTableValues,
    doNotTryUseHash16Impl,
    tryUsePredictedAttemptsToLimitMaxConcurrency,
    findBestGraph,
    graphImpl,
    valueSizeInBytes,
    mainWorkThreadpoolPriority,
    fileWorkThreadpoolPriority,
    attemptsBeforeTableResize,
    maxNumberOfTableResizes,
    initialNumberOfTableResizes,
    autoResizeWhenKeysToEdgesRatioExceeds,
    bestCoverageAttempts,
    bestCoverageType,
    maxNumberOfEqualBestGraphs,
    minNumberOfKeysForFindBestGraph,
    bestCoverageTargetValue,
    keysSubset,
    targetNumberOfSolutions,
    fixedAttempts,
    seeds,
    seed3Byte1MaskCounts,
    seed3Byte2MaskCounts,
    solutionsFoundRatio,
    rng,
    rngSeed,
    rngSubsequence,
    rngOffset,
    maxSolveTimeInSeconds,
    functionHookCallbackDllPath,
    functionHookCallbackFunctionName,
    functionHookCallbackIgnoreRip,
    remark,
  } = formState;

  // Determine executable and keys target
  const exeTypeString = exeType === 'Create' ? 'PerfectHashCreate' : 'PerfectHashBulkCreate';
  const exeSuffix = platform === 'Windows' ? '.exe' : '';
  const exe = `${exeTypeString}${exeSuffix}`;
  const keysTarget = exeType === 'Create' ? keysPath : keysDirectory;

  // Start building the command with required parameters
  let command = `${exe} ${keysTarget} ${outputDirectory} ${algorithm} ${hashFunction} ${maskFunction} ${maxConcurrency}`;

  // Append optional flags based on formState
  const addFlag = (flag, condition) => {
    if (condition) command += ` ${flag}`;
  };

  addFlag('--SkipTestAfterCreate', skipTestAfterCreate);
  addFlag('--Compile', compile);
  addFlag('--TryLargePagesForKeysData', tryLargePagesForKeysData);
  addFlag('--SkipKeysVerification', skipKeysVerification);
  addFlag('--DisableImplicitKeyDownsizing', disableImplicitKeyDownsizing);
  addFlag('--TryInferKeySizeFromKeysFilename', tryInferKeySizeFromKeysFilename);
  addFlag('--Silent', silent);
  addFlag('--Quiet', quiet);
  addFlag('--NoFileIo', noFileIo);
  addFlag('--Paranoid', paranoid);
  addFlag('--SkipGraphVerification', skipGraphVerification);
  addFlag('--DisableCsvOutputFile', disableCsvOutputFile);
  addFlag('--OmitCsvRowIfTableCreateFailed', omitCsvRowIfTableCreateFailed);
  addFlag('--OmitCsvRowIfTableCreateSucceeded', omitCsvRowIfTableCreateSucceeded);
  addFlag('--IndexOnly', indexOnly);
  addFlag('--DoNotUseRwsSectionForTableValues', doNotUseRwsSectionForTableValues);
  addFlag('--UseNonTemporalAvx2Routines', useNonTemporalAvx2Routines);
  addFlag('--ClampNumberOfEdges', clampNumberOfEdges);
  addFlag('--UseOriginalSeededHashRoutines', useOriginalSeededHashRoutines);
  addFlag('--DoNotHashAllKeysFirst', doNotHashAllKeysFirst);
  addFlag('--EnableWriteCombineForVertexPairs', enableWriteCombineForVertexPairs);
  addFlag('--RemoveWriteCombineAfterSuccessfulHashKeys', removeWriteCombineAfterSuccessfulHashKeys);
  addFlag('--TryLargePagesForVertexPairs', tryLargePagesForVertexPairs);
  addFlag('--TryLargePagesForGraphEdgeAndVertexArrays', tryLargePagesForGraphEdgeAndVertexArrays);
  addFlag('--TryLargePagesForGraphTableData', tryLargePagesForGraphTableData);
  addFlag('--UsePreviousTableSize', usePreviousTableSize);
  addFlag('--IncludeNumberOfTableResizeEventsInOutputPath', includeNumberOfTableResizeEventsInOutputPath);
  addFlag('--IncludeNumberOfTableElementsInOutputPath', includeNumberOfTableElementsInOutputPath);
  addFlag('--RngUseRandomStartSeed', rngUseRandomStartSeed);
  addFlag('--DoNotTryUseAvx2HashFunction', doNotTryUseAvx2HashFunction);
  addFlag('--TryUseAvx512HashFunction', tryUseAvx512HashFunction);
  addFlag('--DoNotTryUseAvx2MemoryCoverageFunction', doNotTryUseAvx2MemoryCoverageFunction);
  addFlag('--DoNotIncludeKeysInCompiledDll', doNotIncludeKeysInCompiledDll);
  addFlag('--DisableSavingCallbackTableValues', disableSavingCallbackTableValues);
  addFlag('--DoNotTryUseHash16Impl', doNotTryUseHash16Impl);
  addFlag('--TryUsePredictedAttemptsToLimitMaxConcurrency', tryUsePredictedAttemptsToLimitMaxConcurrency);
  addFlag('--FindBestGraph', findBestGraph);

  const addParam = (param, value, defaultValue) => {
    // Only append if the value is different from the default.
    if (value !== null && value !== defaultValue) command += ` ${param}=${value}`;
  };

  const addBestParam = (param, value, defaultValue) => {
    // Only append if the value is different from the default.
    if (findBestGraph && value !== null && value !== defaultValue) command += ` ${param}=${value}`;
  };

  // Append numeric and string options
  addParam('--GraphImpl', graphImpl, 3);
  addParam('--ValueSizeInBytes', valueSizeInBytes, 4);
  addParam('--MainWorkThreadpoolPriority', mainWorkThreadpoolPriority, 'Normal');
  addParam('--FileWorkThreadpoolPriority', fileWorkThreadpoolPriority, 'Normal');
  addParam('--AttemptsBeforeTableResize', attemptsBeforeTableResize, 4294967295);
  addParam('--MaxNumberOfTableResizes', maxNumberOfTableResizes, 5);
  addParam('--InitialNumberOfTableResizes', initialNumberOfTableResizes, 0);
  addParam('--AutoResizeWhenKeysToEdgesRatioExceeds', autoResizeWhenKeysToEdgesRatioExceeds, 0.0);
  addBestParam('--BestCoverageAttempts', bestCoverageAttempts, null);
  addBestParam('--BestCoverageType', bestCoverageType, null);
  addBestParam('--MaxNumberOfEqualBestGraphs', maxNumberOfEqualBestGraphs, null);
  addBestParam('--MinNumberOfKeysForFindBestGraph', minNumberOfKeysForFindBestGraph, 512);
  addBestParam('--BestCoverageTargetValue', bestCoverageTargetValue, null);
  if (keysSubset) command += ` --KeysSubset=${keysSubset}`;
  addBestParam('--TargetNumberOfSolutions', targetNumberOfSolutions, null);
  if (fixedAttempts) command += ` --FixedAttempts=${fixedAttempts}`;
  if (seeds) command += ` --Seeds=${seeds}`;
  if (seed3Byte1MaskCounts) command += ` --Seed3Byte1MaskCounts=${seed3Byte1MaskCounts}`;
  if (seed3Byte2MaskCounts) command += ` --Seed3Byte2MaskCounts=${seed3Byte2MaskCounts}`;
  if (solutionsFoundRatio !== null) command += ` --SolutionsFoundRatio=${solutionsFoundRatio}`;

  addParam('--Rng', rng, 'Philox43210');
  addParam('--RngSeed', rngSeed, '0x2019090319811025');
  addParam('--RngSubsequence', rngSubsequence, 0);
  addParam('--RngOffset', rngOffset, 0);
  if (maxSolveTimeInSeconds !== null) command += ` --MaxSolveTimeInSeconds=${maxSolveTimeInSeconds}`;
  if (functionHookCallbackDllPath) {
    command += ` --FunctionHookCallbackDllPath=${functionHookCallbackDllPath}`;
    if (functionHookCallbackFunctionName) {
      command += ` --FunctionHookCallbackFunctionName=${functionHookCallbackFunctionName}`;
    }
    if (functionHookCallbackIgnoreRip !== null) {
      command += ` --FunctionHookCallbackIgnoreRip=${functionHookCallbackIgnoreRip}`;
    }
  }
  if (remark) command += ` --Remark="${remark}"`;

  return command;
};

const PerfectHashForm = () => {
  const [formState, updateFormState] = useImmer(initialFormStateWindows);

  // Zod validation (to validate form state)
  const parseResult = formSchema.safeParse(formState);
  const isFormValid = parseResult.success;

  // Generate command string based on form state
  const command = generateCommand(formState);

  // Handle form state updates with Immer
  const handleChange = (field, value) => {
    updateFormState((draft) => {
      draft[field] = value;

      // Automatically adjust dependent fields
      if (field === 'platform') {
        const isWindows = value === 'Windows';
        draft.keysPath = isWindows
          ? 'c:\\src\\perfecthash-keys\\sys32\\HologramWorld-31016.keys'
          : '~/src/perfecthash-keys/sys32/HologramWorld-31016.keys';
        draft.keysDirectory = isWindows ? 'c:\\src\\perfecthash-keys\\sys32' : '~/src/perfecthash-keys/sys32';
        draft.outputDirectory = isWindows
          ? `c:\\Temp\\ph.out.${getCurrentDateTimeString()}`
          : `~/tmp/ph.out.${getCurrentDateTimeString()}`;
      }

      if (field === 'exeType') {
        draft.quiet = value === 'Bulk Create' && !draft.findBestGraph;
        draft.noFileIo = value === 'Bulk Create';
      }
    });
  };

  const [cli, setCli] = useState({});

  const advancedRef = useRef(null);
  const uncommonRef = useRef(null);

  useEffect(() => {
    fetch('/cli.md')
      .then((response) => response.text())
      .then((text) => {
        // Split by level-one headers (`# `)
        const levelOneSections = text.split(/^# .*/gm);

        // Initialize contentObj to store level-two headers and their content
        const contentObj = {};

        // Iterate over each level-one section
        levelOneSections.forEach((section) => {
          // Split by level-two headers (`## `) within each level-one section
          const levelTwoSections = section.split(/^## /gm);

          // Ignore the first split part (text before the first level-two
          // header)
          levelTwoSections.slice(1).forEach((subSection) => {
            // Separate each level-two header from its content
            const [key, ...description] = subSection.trim().split('\n');

            // Add to contentObj where key is the level-two header and
            // value is the description.
            if (key) contentObj[key.trim()] = description.join('\n');
          });
        });

        // Set the processed content object in the state
        setCli(contentObj);
      });
  }, []);

  return (
    <>
      {/* Sticky Command Box */}
      <Container className="sticky-command-box p-3 mt-4">
        <Form.Group>
          <Form.Label>Generated Command</Form.Label>
          <Form.Control as="textarea" readOnly value={command} className="command-box" />
          <Button variant="primary" className="mt-2" onClick={() => navigator.clipboard.writeText(command)}>
            Copy to Clipboard
          </Button>
        </Form.Group>
      </Container>

      <Container className="perfecthash-form">
        <Row className="g-2">
          <Col md>
            {/* Platform Select */}
            <FloatingLabel controlId="platformSelect" label="Platform" className="mb-3">
              <Form.Select value={formState.platform} onChange={(e) => handleChange('platform', e.target.value)}>
                <option value="Windows">Windows</option>
                <option value="Linux">Linux</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md>
            {/* Executable Type Select */}
            <FloatingLabel controlId="exeTypeSelect" label="Executable Type" className="mb-3">
              <Form.Select value={formState.exeType} onChange={(e) => handleChange('exeType', e.target.value)}>
                <option value="Create">Create</option>
                <option value="Bulk Create">Bulk Create</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <Row>
              <Col id="show-advanced" ref={advancedRef}>
                <Form.Check
                  type="switch"
                  id="advanced-switch"
                  label="Show Advanced"
                  checked={formState.advancedOptions} // Bind checked state to formState
                  onChange={(e) => handleChange('advancedOptions', e.target.checked)} // Update formState on change
                />
              </Col>
              <Col id="show-uncommon" ref={uncommonRef}>
                <Form.Check
                  type="switch"
                  id="uncommon-switch"
                  label="Show Uncommon"
                  checked={formState.uncommonOptions} // Bind checked state to formState
                  onChange={(e) => handleChange('uncommonOptions', e.target.checked)} // Update formState on change
                />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Conditionally Render Keys Path or Keys Directory Based on exeType */}
        {formState.exeType === 'Create' && (
          <FloatingLabel controlId="keysPath" label="Keys Path" className="mb-3">
            <Form.Control
              type="text"
              value={formState.keysPath}
              onChange={(e) => handleChange('keysPath', e.target.value)}
              placeholder="Enter keys path"
            />
          </FloatingLabel>
        )}

        {formState.exeType === 'Bulk Create' && (
          <FloatingLabel controlId="keysDirectory" label="Keys Directory" className="mb-3">
            <Form.Control
              type="text"
              value={formState.keysDirectory}
              onChange={(e) => handleChange('keysDirectory', e.target.value)}
              placeholder="Enter keys directory"
            />
          </FloatingLabel>
        )}
        {/* Additional fields following similar structure */}

        {/* Output Directory */}
        <FloatingLabel controlId="outputDirectory" label="Output Directory" className="mb-3">
          <Form.Control
            type="text"
            value={formState.outputDirectory}
            onChange={(e) => handleChange('outputDirectory', e.target.value)}
            placeholder="Enter output directory"
          />
        </FloatingLabel>

        <Row className="g-2">
          <Col>
            <FloatingLabel controlId="algorithmSelect" label="Algorithm" className="mb-3">
              <Form.Select value={formState.algorithm} onChange={(e) => handleChange('algorithm', e.target.value)}>
                {/* Dynamically generate options from the Zod schema */}
                {formSchema.shape.algorithm.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="hashFunctionSelect" label="Hash Function" className="mb-3">
              <Form.Select
                value={formState.hashFunction}
                onChange={(e) => handleChange('hashFunction', e.target.value)}
              >
                {/* Dynamically generate options from the Zod schema */}
                {formSchema.shape.hashFunction.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="maskFunctionSelect" label="Mask Function" className="mb-3">
              <Form.Select
                value={formState.maskFunction}
                onChange={(e) => handleChange('maskFunction', e.target.value)}
              >
                {/* Dynamically generate options from the Zod schema */}
                {formSchema.shape.maskFunction.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId="maxConcurrency" label="Maximum Concurrency" className="mb-3">
              <Form.Control
                type="number"
                min="1"
                max="127"
                value={formState.maxConcurrency}
                onChange={(e) => handleChange('maxConcurrency', e.target.value)}
                placeholder="Enter max concurrency"
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Form>
          {formState.advancedOptions && (
            <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Create Flags</Accordion.Header>
                <Accordion.Body>
                  <Table borderless className="w-100">
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Skip Test After Create"
                            id="skipTestAfterCreate"
                            checked={formState.skipTestAfterCreate}
                            onChange={(e) => handleChange('skipTestAfterCreate', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['SkipTestAfterCreate']}</ReactMarkdown>
                        </td>
                      </tr>

                      {formState.platform === 'Windows' && (
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Compile"
                              id="compile"
                              checked={formState.compile}
                              onChange={(e) => handleChange('compile', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['Compile']}</ReactMarkdown>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}

          {formState.advancedOptions && (
            <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Keys Load Flags</Accordion.Header>
                <Accordion.Body>
                  <Table borderless className="w-100 table-2c-custom">
                    <tbody>
                      {formState.platform === 'Windows' && (
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Try Large Pages For Keys Data"
                              id="tryLargePagesForKeysData"
                              checked={formState.tryLargePagesForKeysData}
                              onChange={(e) => handleChange('tryLargePagesForKeysData', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['TryLargePagesForKeysData']}</ReactMarkdown>
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Skip Keys Verification"
                            id="skipKeysVerification"
                            checked={formState.skipKeysVerification}
                            onChange={(e) => handleChange('skipKeysVerification', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['SkipKeysVerification']}</ReactMarkdown>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Disable Implicit Key Downsizing"
                            id="disableImplicitKeyDownsizing"
                            checked={formState.disableImplicitKeyDownsizing}
                            onChange={(e) => handleChange('disableImplicitKeyDownsizing', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['DisableImplicitKeyDownsizing']}</ReactMarkdown>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Try Infer Key Size From Keys Filename"
                            id="tryInferKeySizeFromKeysFilename"
                            checked={formState.tryInferKeySizeFromKeysFilename}
                            onChange={(e) => handleChange('tryInferKeySizeFromKeysFilename', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['TryInferKeySizeFromKeysFilename']}</ReactMarkdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}

          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Table Create Flags</Accordion.Header>
              <Accordion.Body>
                <Table borderless className="w-100 table-2c-custom">
                  <tbody>
                    <tr>
                      <td>
                        <Form.Check
                          disabled
                          type="checkbox"
                          label="First Graph Wins"
                          checked={!formState.findBestGraph}
                          id="disabled-default-checkbox"
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['FirstGraphWins']}</ReactMarkdown>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Form.Check
                          type="checkbox"
                          label="Find Best Graph"
                          id="findBestGraph"
                          checked={formState.findBestGraph}
                          onChange={(e) => handleChange('findBestGraph', e.target.checked)}
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['FindBestGraph']}</ReactMarkdown>
                      </td>
                    </tr>

                    {formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Silent"
                            id="silent"
                            checked={formState.silent}
                            onChange={(e) => handleChange('silent', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['Silent']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td>
                        <Form.Check
                          type="checkbox"
                          label="Quiet"
                          id="quiet"
                          checked={formState.quiet}
                          onChange={(e) => handleChange('quiet', e.target.checked)}
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['Quiet']}</ReactMarkdown>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Form.Check
                          type="checkbox"
                          label="No File I/O"
                          id="noFileIo"
                          checked={formState.noFileIo}
                          onChange={(e) => handleChange('noFileIo', e.target.checked)}
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['NoFileIo']}</ReactMarkdown>
                      </td>
                    </tr>

                    {formState.advancedOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Index Only"
                            id="indexOnly"
                            checked={formState.indexOnly}
                            onChange={(e) => handleChange('indexONly', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['IndexOnly']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Paranoid"
                            id="paranoid"
                            checked={formState.paranoid}
                            onChange={(e) => handleChange('paranoid', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['Paranoid']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.advancedOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              disabled
                              type="checkbox"
                              label="Hash All Keys First"
                              id="disabled-default-checkbox"
                              checked={!formState.doNotHashAllKeysFirst}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['HashAllKeysFirst']}</ReactMarkdown>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Do Not Hash All Keys First"
                              id="doNotHashAllKeysFirst"
                              checked={formState.doNotHashAllKeysFirst}
                              onChange={(e) => handleChange('doNotHashAllKeysFirst', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['DoNotHashAllKeysFirst']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.platform === 'Windows' && formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            disabled={formState.doNotHashAllKeysFirst}
                            type="checkbox"
                            label="Enable Write Combine For Vertex Pairs"
                            id="enableWriteCombineForVertexPairs"
                            checked={!formState.doNotHashAllKeysFirst && formState.enableWriteCombineForVertexPairs}
                            onChange={(e) => handleChange('enableWriteCombineForVertexPairs', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['EnableWriteCombineForVertexPairs']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.platform === 'Windows' && formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            disabled={formState.doNotHashAllKeysFirst}
                            type="checkbox"
                            label="Remove Write Combine After Successful Hash Keys"
                            id="removeWriteCombineAfterSuccessfulHashKeys"
                            checked={
                              !formState.doNotHashAllKeysFirst && formState.removeWriteCombineAfterSuccessfulHashKeys
                            }
                            onChange={(e) =>
                              handleChange('removeWriteCombineAfterSuccessfulHashKeys', e.target.checked)
                            }
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['RemoveWriteCombineAfterSuccessfulHashKeys']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.platform === 'Windows' && formState.advancedOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            disabled={formState.doNotHashAllKeysFirst}
                            type="checkbox"
                            label="Try Large Pages For Vertex Pairs"
                            id="tryLargePagesForVertexPairs"
                            checked={!formState.doNotHashAllKeysFirst && formState.tryLargePagesForVertexPairs}
                            onChange={(e) => handleChange('tryLargePagesForVertexPairs', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['TryLargePagesForVertexPairs']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.platform === 'Windows' && formState.advancedOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            disabled={formState.doNotHashAllKeysFirst}
                            type="checkbox"
                            label="Try Large Pages For Graph Edge And Vertex Arrays"
                            id="tryLargePagesForGraphEdgeAndVertexArrays"
                            checked={
                              !formState.doNotHashAllKeysFirst && formState.tryLargePagesForGraphEdgeAndVertexArrays
                            }
                            onChange={(e) => handleChange('tryLargePagesForGraphEdgeAndVertexArrays', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['TryLargePagesForGraphEdgeAndVertexArrays']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.platform === 'Windows' && formState.advancedOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            disabled={formState.doNotHashAllKeysFirst}
                            type="checkbox"
                            label="Try Large Pages For Graph Table Data"
                            id="tryLargePagesForGraphTableData"
                            checked={!formState.doNotHashAllKeysFirst && formState.tryLargePagesForGraphTableData}
                            onChange={(e) => handleChange('tryLargePagesForGraphTableData', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['TryLargePagesForGraphTableData']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Skip Memory Coverage In First Graph Wins Mode"
                            id="skipMemoryCoverageInFirstGraphWinsMode"
                            checked={formState.skipMemoryCoverageInFirstGraphWinsMode}
                            onChange={(e) => handleChange('skipMemoryCoverageInFirstGraphWinsMode', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['SkipMemoryCoverageInFirstGraphWinsMode']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Skip Graph Verification"
                            id="skipGraphVerification"
                            checked={formState.skipGraphVerification}
                            onChange={(e) => handleChange('skipGraphVerification', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['SkipGraphVerification']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Disable CSV Output File"
                            id="disableCsvOutputFile"
                            checked={formState.disableCsvOutputFile}
                            onChange={(e) => handleChange('disableCsvOutputFile', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['DisableCsvOutputFile']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Omit CSV Row If Table Create Failed"
                            id="omitCsvRowIfTableCreateFailed"
                            checked={formState.omitCsvRowIfTableCreateFailed}
                            onChange={(e) => handleChange('omitCsvRowIfTableCreateFailed', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['OmitCsvRowIfTableCreateFailed']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Omit CSV Row If Table Create Succeeded"
                            id="omitCsvRowIfTableCreateSucceeded"
                            checked={formState.omitCsvRowIfTableCreateSucceeded}
                            onChange={(e) => handleChange('omitCsvRowIfTableCreateSucceeded', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['OmitCsvRowIfTableCreateSucceeded']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.platform === 'Windows' && formState.advancedOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              disabled
                              type="checkbox"
                              label="Use RWS Section For Table Values"
                              id="useRwsSectionForTableValues"
                              checked={!formState.doNotRwsSectionForTableValues}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['UseRwsSectionForTableValues']}</ReactMarkdown>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Do Not Use RWS Section For Table Values"
                              id="doNotUseRwsSectionForTableValues"
                              checked={formState.doNotUseRwsSectionForTableValues}
                              onChange={(e) => handleChange('DoNotUseRwsSectionForTableValues', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['DoNotUseRwsSectionForTableValues']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}
                    {formState.platform === 'Windows' && formState.uncommonOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Use Non-Temporal AVX2 Routines"
                              id="useNonTemporalAvx2Routines"
                              checked={formState.useNonTemporalAvx2Routines}
                              onChange={(e) => handleChange('useNonTemporalAvx2Routines', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['UseNonTemporalAvx2Routines']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}
                    {formState.uncommonOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Clamp Number Of Edges"
                              id="clampNumberOfEdges"
                              checked={formState.clampNumberOfEdges}
                              onChange={(e) => handleChange('clampNumberOfEdges', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['ClampNumberOfEdges']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.uncommonOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Use Original Seeded Hash Routines"
                              id="useOriginalSeededHashRoutines"
                              checked={formState.useOriginalSeededHashRoutines}
                              onChange={(e) => handleChange('useOriginalSeededHashRoutines', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['UseOriginalSeededHashRoutines']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.uncommonOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Use Previous Table Size"
                              id="usePreviousTableSize"
                              checked={formState.usePreviousTableSize}
                              onChange={(e) => handleChange('usePreviousTableSize', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['UsePreviousTableSize']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.uncommonOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Include Number Of Table Resize Events In Output Path"
                              id="includeNumberOfTableResizeEventsInOutputPath"
                              checked={formState.includeNumberOfTableResizeEventsInOutputPath}
                              onChange={(e) =>
                                handleChange('includeNumberOfTableResizeEventsInOutputPath', e.target.checked)
                              }
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['IncludeNumberOfTableResizeEventsInOutputPath']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.uncommonOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Include Number Of Table Elements In Output Path"
                              id="includeNumberOfTableElementsInOutputPath"
                              checked={formState.includeNumberOfTableElementsInOutputPath}
                              onChange={(e) =>
                                handleChange('includeNumberOfTableElementsInOutputPath', e.target.checked)
                              }
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['IncludeNumberOfTableElementsInOutputPath']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.advancedOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Rng Use Random Start Seed"
                              id="rngUseRandomStartSeed"
                              checked={formState.rngUseRandomStartSeed}
                              onChange={(e) => handleChange('rngUseRandomStartSeed', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['RngUseRandomStartSeed']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.platform === 'Windows' && formState.advancedOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              disabled="true"
                              type="checkbox"
                              label="Try Use AVX2 Hash Function"
                              id="tryUseAvx2HashFunction"
                              checked={!formState.doNotTryUseAvx2HashFunction}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['TryUseAvx2HashFunction']}</ReactMarkdown>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Do Not Try Use AVX2 Hash Function"
                              id="doNotTryUseAvx2HashFunction"
                              checked={formState.doNotTryUseAvx2HashFunction}
                              onChange={(e) => handleChange('doNotTryUseAvx2HashFunction', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['DoNotTryUseAvx2HashFunction']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.platform === 'Windows' && formState.advancedOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Try Use AVX512 Hash Function"
                            id="tryUseAvx512HashFunction"
                            checked={formState.tryUseAvx512HashFunction}
                            onChange={(e) => handleChange('tryUseAvx512HashFunction', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['TryUseAvx512HashFunction']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.platform === 'Windows' && formState.advancedOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              disabled="true"
                              type="checkbox"
                              label="Try Use AVX2 Memory Coverage Function"
                              id="tryUseAvx2MemoryCoverageFunction"
                              checked={!formState.doNotTryUseAvx2MemoryCoverageFunction}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['TryUseAvx2MemoryCoverageFunction']}</ReactMarkdown>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Do Not Try Use AVX2 Memory Coverage Function"
                              id="doNotTryUseAvx2MemoryCoverageFunction"
                              checked={formState.doNotTryUseAvx2MemoryCoverageFunction}
                              onChange={(e) => handleChange('doNotTryUseAvx2MemoryCoverageFunction', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['DoNotTryUseAvx2MemoryCoverageFunction']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.platform === 'Windows' && formState.advancedOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Try Use AVX512 Memory Coverage Function"
                              id="tryUseAvx512MemoryCoverageFunction"
                              checked={formState.tryUseAvx512MemoryCoverageFunction}
                              onChange={(e) => handleChange('tryUseAvx512MemoryCoverageFunction', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['TryUseAvx512MemoryCoverageFunction']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.advancedOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              disabled="true"
                              type="checkbox"
                              label="Include Keys In Compiled Dll"
                              id="includeKeysInCompiledDll"
                              checked={!formState.doNotIncludeKeysInCompiledDll}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['IncludeKeysInCompiledDll']}</ReactMarkdown>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Do Not Include Keys In Compiled Dll"
                              id="doNotIncludeKeysInCompiledDll"
                              checked={formState.doNotIncludeKeysInCompiledDll}
                              onChange={(e) => handleChange('doNotIncludeKeysInCompiledDll', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['DoNotIncludeKeysInCompiledDll']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.advancedOptions && (
                      <>
                        <tr>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label="Disable Saving Callback Table Values"
                              id="disableSavingCallbackTableValues"
                              checked={formState.disableSavingCallbackTableValues}
                              onChange={(e) => handleChange('disableSavingCallbackTableValues', e.target.checked)}
                            />
                          </td>
                          <td>
                            <ReactMarkdown>{cli['DisableSavingCallbackTableValues']}</ReactMarkdown>
                          </td>
                        </tr>
                      </>
                    )}

                    {formState.advancedOptions && (
                      <tr>
                        <td>
                          <Form.Check
                            type="checkbox"
                            label="Do Not Try Use Hash16 Impl"
                            id="doNotTryUseHash16Impl"
                            checked={formState.doNotTryUseHash16Impl}
                            onChange={(e) => handleChange('doNotTryUseHash16Impl', e.target.checked)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['DoNotTryUseHash16Impl']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Table Create Parameters</Accordion.Header>
              <Accordion.Body>
                <Table borderless className="w-100 table-3c-custom">
                  <tbody>
                    <tr>
                      <td>Graph Implementation</td>
                      <td>
                        <Form.Select
                          value={formState.graphImpl}
                          onChange={(e) => handleChange('graphImpl', e.target.value)}
                        >
                          {/* Dynamically generate options from the Zod schema */}
                          {formSchema.shape.graphImpl.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        <ReactMarkdown>{cli['GraphImpl']}</ReactMarkdown>
                      </td>
                    </tr>

                    <tr>
                      <td>Best Coverage Attempts</td>
                      <td>
                        <Form.Control
                          value={formState.bestCoverageAttempts}
                          onChange={(e) => handleChange('bestCoverageAttempts', e.target.value)}
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['BestCoverageAttempts']}</ReactMarkdown>
                      </td>
                    </tr>

                    <tr>
                      <td>Best Coverage Type</td>
                      <td>
                        <Form.Select
                          value={formState.bestCoverageType}
                          onChange={(e) => handleChange('bestCoverageType', e.target.value)}
                        >
                          {/* Dynamically generate options from the Zod schema */}
                          {formSchema.shape.bestCoverageType.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        <ReactMarkdown>{cli['BestCoverageType']}</ReactMarkdown>
                      </td>
                    </tr>

                    <tr>
                      <td>Max Number Of Equal Best Graphs</td>
                      <td>
                        <Form.Control
                          value={formState.maxNumberOfEqualBestGraphs}
                          onChange={(e) => handleChange('maxNumberOfEqualBestGraphs', e.target.value)}
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['MaxNumberOfEqualBestGraphs']}</ReactMarkdown>
                      </td>
                    </tr>

                    <tr>
                      <td>Best Coverage Target Value</td>
                      <td>
                        <Form.Control
                          value={formState.bestCoverageTargetValue}
                          onChange={(e) => handleChange('bestCoverageTargetValue', e.target.value)}
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['BestCoverageTargetValue']}</ReactMarkdown>
                      </td>
                    </tr>

                    <tr>
                      <td>Fixed Attempts</td>
                      <td>
                        <Form.Control
                          value={formState.fixedAttempts}
                          onChange={(e) => handleChange('fixedAttempts', e.target.value)}
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['FixedAttempts']}</ReactMarkdown>
                      </td>
                    </tr>

                    <tr>
                      <td>Target Number Of Solutions</td>
                      <td>
                        <Form.Control
                          value={formState.targetNumberOfSolutions}
                          onChange={(e) => handleChange('targetNumberOfSolutions', e.target.value)}
                        />
                      </td>
                      <td>
                        <ReactMarkdown>{cli['TargetNumberOfSolutions']}</ReactMarkdown>
                      </td>
                    </tr>

                    {formState.advancedOptions && (
                      <tr>
                        <td>Value Size In Bytes</td>
                        <td>
                          <Form.Control
                            value={formState.valueSizeInBytes}
                            onChange={(e) => handleChange('valueSizeInBytes', e.target.value)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['ValueSizeInBytes']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>Attempts Before Table Resize</td>
                        <td>
                          <Form.Control
                            value={formState.attemptsBeforeTableResize}
                            onChange={(e) => handleChange('attemptsBeforeTableResize', e.target.value)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['AttemptsBeforeTableResize']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>Max Number Of Table Resizes</td>
                        <td>
                          <Form.Control
                            value={formState.maxNumberOfTableResizes}
                            onChange={(e) => handleChange('maxNumberOfTableResizes', e.target.value)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['MaxNumberOfTableResizes']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>Initial Number Of Table Resizes</td>
                        <td>
                          <Form.Control
                            value={formState.initialNumberOfTableResizes}
                            onChange={(e) => handleChange('initialNumberOfTableResizes', e.target.value)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['InitialNumberOfTableResizes']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>Auto Resize When Keys-To-Edges Ratio Exceeds</td>
                        <td>
                          <Form.Control
                            value={formState.autoResizeWhenKeysToEdgesRatioExceeds}
                            onChange={(e) => handleChange('autoResizeWhenKeysToEdgesRatioExceeds', e.target.value)}
                          />
                        </td>
                        <td>
                          <ReactMarkdown>{cli['AutoResizeWhenKeysToEdgesRatioExceeds']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>Main Work Threadpool Priority</td>
                        <td>
                          <Form.Select
                            value={formState.mainWorkThreadpoolPriority}
                            onChange={(e) => handleChange('mainWorkThreadpoolPriority', e.target.value)}
                          >
                            {/* Dynamically generate options from the Zod schema */}
                            {formSchema.shape.mainWorkThreadpoolPriority.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                        </td>
                        <td>
                          <ReactMarkdown>{cli['MainWorkThreadpoolPriority']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}

                    {formState.uncommonOptions && (
                      <tr>
                        <td>File Work Threadpool Priority</td>
                        <td>
                          <Form.Select
                            value={formState.fileWorkThreadpoolPriority}
                            onChange={(e) => handleChange('fileWorkThreadpoolPriority', e.target.value)}
                          >
                            {/* Dynamically generate options from the Zod schema */}
                            {formSchema.shape.fileWorkThreadpoolPriority.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                        </td>
                        <td>
                          <ReactMarkdown>{cli['FileWorkThreadpoolPriority']}</ReactMarkdown>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Form>
      </Container>
    </>
  );
};

export default PerfectHashForm;
