import React, { useState, useEffect, useRef } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import { useImmer } from 'use-immer';

import { z } from 'zod';
import { Card } from 'react-bootstrap';

import Icon from './Icons';

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
  floatingCommand: z.boolean(),
  expandOptions: z.boolean(),
  autoCopyToClipboard: z.boolean(),
  advancedOptions: z.boolean(),
  uncommonOptions: z.boolean(),
  includeDefaults: z.boolean(),
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
  autoResizeWhenKeysToEdgesRatioExceeds: z.number().min(0.0).max(1.0),
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
  floatingCommand: true,
  expandOptions: false,
  autoCopyToClipboard: true,
  advancedOptions: true,
  uncommonOptions: false,
  includeDefaults: false,
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
  attemptsBeforeTableResize: 4294967295,
  maxNumberOfTableResizes: 5,
  initialNumberOfTableResizes: 0,
  autoResizeWhenKeysToEdgesRatioExceeds: 1.0,
  bestCoverageAttempts: 5,
  bestCoverageType: 'HighestRank',
  maxNumberOfEqualBestGraphs: 3,
  minNumberOfKeysForFindBestGraph: 512,
  bestCoverageTargetValue: null,
  keysSubset: null,
  targetNumberOfSolutions: null,
  fixedAttempts: null,
  seeds: null,
  seed3Byte1MaskCounts: null,
  seed3Byte2MaskCounts: null,
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
  outputDirectory: `c:\\src\\perfecthash-interop\\${getCurrentDateTimeString()}`,
};

const initialFormStateLinux = {
  ...initialFormStateGeneric,
  platform: 'Linux',
  keysPath: '~/src/perfecthash-keys/sys32/HologramWorld-31016.keys',
  keysDirectory: '~/src/perfecthash-keys/sys32',
  outputDirectory: `~/src/perfecthash-interop/${getCurrentDateTimeString()}`,
};

const generateCommand = (formState) => {
  const {
    autoCopyToClipboard,
    includeDefaults,
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

  const addDefaultFlag = (flag, condition) => {
    if (includeDefaults && condition) command += ` ${flag}`;
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
  addDefaultFlag('--UseRwsSectionForTableValues', !doNotUseRwsSectionForTableValues);
  addFlag('--DoNotUseRwsSectionForTableValues', doNotUseRwsSectionForTableValues);
  addFlag('--UseNonTemporalAvx2Routines', useNonTemporalAvx2Routines);
  addFlag('--ClampNumberOfEdges', clampNumberOfEdges);
  addFlag('--UseOriginalSeededHashRoutines', useOriginalSeededHashRoutines);
  addDefaultFlag('--HashAllKeysFirst', !doNotHashAllKeysFirst);
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
  addDefaultFlag('--TryUseAvx2HashFunction', !doNotTryUseAvx2HashFunction);
  addFlag('--DoNotTryUseAvx2HashFunction', doNotTryUseAvx2HashFunction);
  addFlag('--TryUseAvx512HashFunction', tryUseAvx512HashFunction);
  addDefaultFlag('--TryUseAvx2MemoryCoverageFunction', !doNotTryUseAvx2MemoryCoverageFunction);
  addFlag('--DoNotTryUseAvx2MemoryCoverageFunction', doNotTryUseAvx2MemoryCoverageFunction);
  addDefaultFlag('--IncludeKeysInCompiledDll', !doNotIncludeKeysInCompiledDll);
  addFlag('--DoNotIncludeKeysInCompiledDll', doNotIncludeKeysInCompiledDll);
  addFlag('--DisableSavingCallbackTableValues', disableSavingCallbackTableValues);
  addFlag('--DoNotTryUseHash16Impl', doNotTryUseHash16Impl);
  addFlag('--TryUsePredictedAttemptsToLimitMaxConcurrency', tryUsePredictedAttemptsToLimitMaxConcurrency);
  addDefaultFlag('--FirstGraphWins', !findBestGraph);
  addFlag('--FindBestGraph', findBestGraph);

  const addParam = (param, value, defaultValue) => {
    if (!includeDefaults) {
      if (value !== null && value !== defaultValue) {
        command += ` ${param}=${value}`;
      }
    } else {
      if (value !== null) {
        command += ` ${param}=${value}`;
      }
    }
  };

  const addBestParam = (param, value, defaultValue) => {
    if (!includeDefaults) {
      // Only append if the value is different from the default.
      if (findBestGraph && value !== null && value !== defaultValue) command += ` ${param}=${value}`;
    } else {
      // Always append the value if it is not null.
      if (findBestGraph && value !== null) command += ` ${param}=${value}`;
    }
  };

  // Append numeric and string options
  addParam('--GraphImpl', graphImpl, 3);
  addParam('--ValueSizeInBytes', valueSizeInBytes, 4);
  addParam('--MainWorkThreadpoolPriority', mainWorkThreadpoolPriority, 'Normal');
  addParam('--FileWorkThreadpoolPriority', fileWorkThreadpoolPriority, 'Normal');
  addParam('--AttemptsBeforeTableResize', attemptsBeforeTableResize, 4294967295);
  addParam('--MaxNumberOfTableResizes', maxNumberOfTableResizes, 5);
  addParam('--InitialNumberOfTableResizes', initialNumberOfTableResizes, 0);
  addParam('--AutoResizeWhenKeysToEdgesRatioExceeds', autoResizeWhenKeysToEdgesRatioExceeds, 1.0);
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

  if (autoCopyToClipboard) {
    navigator.clipboard.writeText(command);
  }

  return command;
};

const isKeysSubsetBestCoverageType = (formState) => {
  /* If formState.bestCoverageType ends with 'KeysSubset', return true. */
  return formState.bestCoverageType && formState.bestCoverageType.endsWith('KeysSubset') ? true : false;
};

const PerfectHashForm = ({ navbarHeight }) => {
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
  const consoleLegendRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}cli.md`)
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

  const textareaRef = useRef(null);
  const commandPanelRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scroll height
    }
  }, [command]); // Re-run effect when command changes

  const [offsetTop, setOffsetTop] = useState(navbarHeight);

  // Adjust offset when pinned.
  useEffect(() => {
    if (formState.floatingCommand && commandPanelRef.current) {
      setOffsetTop(navbarHeight + commandPanelRef.current.offsetHeight);
    } else {
      setOffsetTop(navbarHeight);
    }
  }, [formState.floatingCommand, commandPanelRef.current, navbarHeight]);

  const [clipboardState, setClipboardState] = useState('idle'); // 'idle', 'checked'

  const handleClipboardClick = () => {
    if (!formState.autoCopyToClipboard) {
      setClipboardState('checked');
      navigator.clipboard.writeText(command).then(() => {
        setTimeout(() => {
          setClipboardState('idle');
        }, 1000);
      });
    }
  };

  return (
    <>
      <Container
        ref={commandPanelRef}
        className={`command-panel ${formState.floatingCommand ? 'sticky-command-box' : ''} px-1 pt-1 pb-1`}
        style={formState.floatingCommand ? { top: `${navbarHeight + 10}px`, marginBottom: '1rem' } : {}}
      >
        <Row className="align-items-stretch mx-1">
          {/* Command Textarea */}
          <Col className="d-flex p-0 mr-1" style={{ flex: 1 }}>
            <Form.Floating className="flex-grow-1 w-100">
              <Form.Control
                ref={textareaRef}
                as="textarea"
                readOnly
                value={command}
                className="command-box"
                placeholder="Generated Command"
              />
              <label htmlFor="generatedCommand">Generated Command</label>
            </Form.Floating>
          </Col>

          {/* Icon Column */}
          <Col xs="auto" className="d-flex flex-column justify-content-between p-0 mx-1">
            <Button variant="link" onClick={() => handleChange('floatingCommand', !formState.floatingCommand)}>
              {formState.floatingCommand ? <Icon.PinFill size={12} /> : <Icon.Pin size={12} />}
            </Button>
            <Button variant="link" onClick={() => handleChange('expandOptions', !formState.expandOptions)}>
              {formState.expandOptions ? <Icon.ChevronUp size={12} /> : <Icon.ChevronDown size={12} />}
            </Button>
          </Col>
        </Row>

        {formState.expandOptions && (
          <Row className="d-flex align-items-center justify-content-start mt-1 mb-0">
            {' '}
            {/* justify-content-start ensures left alignment */}
            {/* Copy to Clipboard Button */}
            {/* Options Switches */}
            <Col xs="auto" className="mx-3">
              <Form.Check
                type="switch"
                id="toggle-auto-copy-to-clipboard"
                label="Automatically Copy to Clipboard"
                checked={formState.autoCopyToClipboard}
                onChange={(e) => handleChange('autoCopyToClipboard', e.target.checked)}
              />
            </Col>
            {!formState.autoCopyToClipboard && (
              <Col xs="auto" className="p-0 d-flex align-items-center gt-0">
                <Button
                  variant="link"
                  className={`${formState.autoCopyToClipboard ? 'disabled' : ''} d-flex align-items-center`}
                  onClick={handleClipboardClick}
                >
                  {clipboardState === 'checked' ? (
                    <Icon.ClipboardCheck size={14} className="text-success" /> // Success icon in green
                  ) : (
                    <Icon.Clipboard size={14} /> // Default clipboard icon
                  )}
                </Button>
              </Col>
            )}
            <Col xs="auto" className="mx-3">
              <Form.Check
                type="switch"
                id="advanced-switch"
                label="Show Advanced Options"
                checked={formState.advancedOptions}
                onChange={(e) => handleChange('advancedOptions', e.target.checked)}
              />
            </Col>
            <Col xs="auto" className="mx-3">
              <Form.Check
                type="switch"
                id="uncommon-switch"
                label="Show Uncommon Options"
                checked={formState.uncommonOptions}
                onChange={(e) => handleChange('uncommonOptions', e.target.checked)}
              />
            </Col>
            <Col xs="auto" className="mx-3">
              <Form.Check
                type="switch"
                id="include-default-switch"
                label="Include Defaults"
                checked={formState.includeDefaults}
                onChange={(e) => handleChange('includeDefaults', e.target.checked)}
              />
            </Col>
          </Row>
        )}
      </Container>

      <Container
        className="perfecthash-form"
        style={{ paddingTop: formState.floatingCommand ? `${offsetTop - 50}px` : '0' }}
      >
        <hr />
        <Row className="g-2">
          <Col md={6} lg={4}>
            <FloatingLabel controlId="platformSelect" label="Platform" className="mb-3">
              <Form.Select value={formState.platform} onChange={(e) => handleChange('platform', e.target.value)}>
                <option value="Windows">Windows</option>
                <option value="Linux">Linux</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md={6} lg={4}>
            <FloatingLabel controlId="exeTypeSelect" label="Executable Type" className="mb-3">
              <Form.Select value={formState.exeType} onChange={(e) => handleChange('exeType', e.target.value)}>
                <option value="Create">Create</option>
                <option value="Bulk Create">Bulk Create</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

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

        <FloatingLabel controlId="outputDirectory" label="Output Directory" className="mb-3">
          <Form.Control
            type="text"
            value={formState.outputDirectory}
            onChange={(e) => handleChange('outputDirectory', e.target.value)}
            placeholder="Enter output directory"
          />
        </FloatingLabel>

        <Row className="g-2">
          <Col sm={6} md={4}>
            <FloatingLabel controlId="algorithmSelect" label="Algorithm" className="mb-3">
              <Form.Select value={formState.algorithm} onChange={(e) => handleChange('algorithm', e.target.value)}>
                {formSchema.shape.algorithm.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col sm={6} md={4}>
            <FloatingLabel controlId="hashFunctionSelect" label="Hash Function" className="mb-3">
              <Form.Select
                value={formState.hashFunction}
                onChange={(e) => handleChange('hashFunction', e.target.value)}
              >
                {formSchema.shape.hashFunction.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col sm={6} md={4}>
            <FloatingLabel controlId="maskFunctionSelect" label="Mask Function" className="mb-3">
              <Form.Select
                value={formState.maskFunction}
                onChange={(e) => handleChange('maskFunction', e.target.value)}
              >
                {formSchema.shape.maskFunction.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col sm={6} md={4}>
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

        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0" className="mb-3">
            <Accordion.Header>Table Creation Type</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex flex-column">
                {/* First Row */}
                <Row className="align-items-center mb-3 border-bottom-thin">
                  <Col xs={12} md={4}>
                    <Form.Check
                      disabled
                      type="checkbox"
                      label="First Graph Wins"
                      checked={!formState.findBestGraph}
                      id="disabled-default-checkbox"
                    />
                  </Col>
                  <Col xs={12} md={8} className="mt-2 mt-md-0">
                    <ReactMarkdown>{cli['FirstGraphWins']}</ReactMarkdown>
                  </Col>
                </Row>

                {/* Second Row */}
                <Row className="align-items-center mb-3 border-bottom-thin">
                  <Col xs={12} md={4}>
                    <Form.Check
                      type="checkbox"
                      label="Find Best Graph"
                      id="findBestGraph"
                      checked={formState.findBestGraph}
                      onChange={(e) => handleChange('findBestGraph', e.target.checked)}
                    />
                  </Col>
                  <Col xs={12} md={8} className="mt-2 mt-md-0">
                    <ReactMarkdown>{cli['FindBestGraph']}</ReactMarkdown>
                  </Col>
                </Row>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {formState.findBestGraph && (
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0" className="mb-3">
              <Accordion.Header>Best Graph Parameters</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel controlId="bestCoverageType" label="Best Coverage Type" className="mb-3">
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
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['BestCoverageType']}</ReactMarkdown>
                    </Col>
                  </Row>

                  {formState.exeType === 'Create' && isKeysSubsetBestCoverageType(formState) && (
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="keysSubset" label="Keys Subset">
                          <Form.Control
                            value={formState.keysSubset}
                            onChange={(e) => handleChange('keysSubset', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['KeysSubset']}</ReactMarkdown>
                      </Col>
                    </Row>
                  )}

                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel controlId="bestCoverageAttempts" label="Best Coverage Attempts" className="mb-3">
                        <Form.Control
                          value={formState.bestCoverageAttempts}
                          onChange={(e) => handleChange('bestCoverageAttempts', e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['BestCoverageAttempts']}</ReactMarkdown>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="bestCoverageTargetValue"
                        label="Best Coverage Target Value"
                        className="mb-3"
                      >
                        <Form.Control
                          value={formState.bestCoverageTargetValue}
                          onChange={(e) => handleChange('bestCoverageTargetValue', e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['BestCoverageTargetValue']}</ReactMarkdown>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel controlId="maxNumberOfEqualBestGraphs" label="Max Number Of Equal Best Graphs">
                        <Form.Control
                          value={formState.maxNumberOfEqualBestGraphs}
                          onChange={(e) => handleChange('maxNumberOfEqualBestGraphs', e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['MaxNumberOfEqualBestGraphs']}</ReactMarkdown>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel
                        controlId="targetNumberOfSolutions"
                        label="Target Number Of Solutions"
                        className="mb-3"
                      >
                        <Form.Control
                          value={formState.targetNumberOfSolutions}
                          onChange={(e) => handleChange('targetNumberOfSolutions', e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['TargetNumberOfSolutions']}</ReactMarkdown>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel controlId="maxSolveTimeInSeconds" label="Max Solve Time in Seconds">
                        <Form.Control
                          value={formState.maxSolveTimeInSeconds}
                          onChange={(e) => handleChange('maxSolveTimeInSeconds', e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['MaxSolveTimeInSeconds']}</ReactMarkdown>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel controlId="fixedAttempts" label="Fixed Attempts">
                        <Form.Control
                          value={formState.fixedAttempts}
                          onChange={(e) => handleChange('fixedAttempts', e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['FixedAttempts']}</ReactMarkdown>
                    </Col>
                  </Row>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}

        {formState.uncommonOptions && (
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0" className="mb-3">
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
            <Accordion.Item eventKey="0" className="mb-3">
              <Accordion.Header>Keys Load Flags</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  {formState.platform === 'Windows' && (
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          type="checkbox"
                          label="Try Large Pages For Keys Data"
                          id="tryLargePagesForKeysData"
                          checked={formState.tryLargePagesForKeysData}
                          onChange={(e) => handleChange('tryLargePagesForKeysData', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['TryLargePagesForKeysData']}</ReactMarkdown>
                      </Col>
                    </Row>
                  )}

                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Skip Keys Verification"
                        id="skipKeysVerification"
                        checked={formState.skipKeysVerification}
                        onChange={(e) => handleChange('skipKeysVerification', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['SkipKeysVerification']}</ReactMarkdown>
                    </Col>
                  </Row>

                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Disable Implicit Key Downsizing"
                        id="disableImplicitKeyDownsizing"
                        checked={formState.disableImplicitKeyDownsizing}
                        onChange={(e) => handleChange('disableImplicitKeyDownsizing', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['DisableImplicitKeyDownsizing']}</ReactMarkdown>
                    </Col>
                  </Row>

                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Try Infer Key Size From Keys Filename"
                        id="tryInferKeySizeFromKeysFilename"
                        checked={formState.tryInferKeySizeFromKeysFilename}
                        onChange={(e) => handleChange('tryInferKeySizeFromKeysFilename', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['TryInferKeySizeFromKeysFilename']}</ReactMarkdown>
                    </Col>
                  </Row>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}

        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0" className="mb-3">
            <Accordion.Header>Table Create Flags</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex flex-column">
                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Silent"
                        id="silent"
                        checked={formState.silent}
                        onChange={(e) => handleChange('silent', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['Silent']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                <Row className="align-items-center mb-3 border-bottom-thin">
                  <Col xs={12} md={6}>
                    <Form.Check
                      type="checkbox"
                      label="Quiet"
                      id="quiet"
                      checked={formState.quiet}
                      onChange={(e) => handleChange('quiet', e.target.checked)}
                    />
                  </Col>
                  <Col xs={12} md={6} className="mt-2 mt-md-0">
                    <ReactMarkdown>{cli['Quiet']}</ReactMarkdown>
                  </Col>
                </Row>

                <Row className="align-items-center mb-3 border-bottom-thin">
                  <Col xs={12} md={6}>
                    <Form.Check
                      type="checkbox"
                      label="No File I/O"
                      id="noFileIo"
                      checked={formState.noFileIo}
                      onChange={(e) => handleChange('noFileIo', e.target.checked)}
                    />
                  </Col>
                  <Col xs={12} md={6} className="mt-2 mt-md-0">
                    <ReactMarkdown>{cli['NoFileIo']}</ReactMarkdown>
                  </Col>
                </Row>

                {formState.advancedOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Index Only"
                        id="indexOnly"
                        checked={formState.indexOnly}
                        onChange={(e) => handleChange('indexOnly', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['IndexOnly']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Paranoid"
                        id="paranoid"
                        checked={formState.paranoid}
                        onChange={(e) => handleChange('paranoid', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['Paranoid']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.advancedOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled
                          type="checkbox"
                          label="Hash All Keys First"
                          id="disabled-default-checkbox"
                          checked={!formState.doNotHashAllKeysFirst}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['HashAllKeysFirst']}</ReactMarkdown>
                      </Col>
                    </Row>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          type="checkbox"
                          label="Do Not Hash All Keys First"
                          id="doNotHashAllKeysFirst"
                          checked={formState.doNotHashAllKeysFirst}
                          onChange={(e) => handleChange('doNotHashAllKeysFirst', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['DoNotHashAllKeysFirst']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.platform === 'Windows' && formState.uncommonOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled={formState.doNotHashAllKeysFirst}
                          type="checkbox"
                          label="Enable Write Combine For Vertex Pairs"
                          id="enableWriteCombineForVertexPairs"
                          checked={!formState.doNotHashAllKeysFirst && formState.enableWriteCombineForVertexPairs}
                          onChange={(e) => handleChange('enableWriteCombineForVertexPairs', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['EnableWriteCombineForVertexPairs']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled={formState.doNotHashAllKeysFirst}
                          type="checkbox"
                          label="Remove Write Combine After Successful Hash Keys"
                          id="removeWriteCombineAfterSuccessfulHashKeys"
                          checked={
                            !formState.doNotHashAllKeysFirst && formState.removeWriteCombineAfterSuccessfulHashKeys
                          }
                          onChange={(e) => handleChange('removeWriteCombineAfterSuccessfulHashKeys', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['RemoveWriteCombineAfterSuccessfulHashKeys']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.platform === 'Windows' && formState.advancedOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled={formState.doNotHashAllKeysFirst}
                          type="checkbox"
                          label="Try Large Pages For Vertex Pairs"
                          id="tryLargePagesForVertexPairs"
                          checked={!formState.doNotHashAllKeysFirst && formState.tryLargePagesForVertexPairs}
                          onChange={(e) => handleChange('tryLargePagesForVertexPairs', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['TryLargePagesForVertexPairs']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
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
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['TryLargePagesForGraphEdgeAndVertexArrays']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled={formState.doNotHashAllKeysFirst}
                          type="checkbox"
                          label="Try Large Pages For Graph Table Data"
                          id="tryLargePagesForGraphTableData"
                          checked={!formState.doNotHashAllKeysFirst && formState.tryLargePagesForGraphTableData}
                          onChange={(e) => handleChange('tryLargePagesForGraphTableData', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['TryLargePagesForGraphTableData']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Skip Memory Coverage In First Graph Wins Mode"
                        id="skipMemoryCoverageInFirstGraphWinsMode"
                        checked={formState.skipMemoryCoverageInFirstGraphWinsMode}
                        onChange={(e) => handleChange('skipMemoryCoverageInFirstGraphWinsMode', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['SkipMemoryCoverageInFirstGraphWinsMode']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Skip Graph Verification"
                        id="skipGraphVerification"
                        checked={formState.skipGraphVerification}
                        onChange={(e) => handleChange('skipGraphVerification', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['SkipGraphVerification']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Disable CSV Output File"
                        id="disableCsvOutputFile"
                        checked={formState.disableCsvOutputFile}
                        onChange={(e) => handleChange('disableCsvOutputFile', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['DisableCsvOutputFile']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Omit CSV Row If Table Create Failed"
                        id="omitCsvRowIfTableCreateFailed"
                        checked={formState.omitCsvRowIfTableCreateFailed}
                        onChange={(e) => handleChange('omitCsvRowIfTableCreateFailed', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['OmitCsvRowIfTableCreateFailed']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Omit CSV Row If Table Create Succeeded"
                        id="omitCsvRowIfTableCreateSucceeded"
                        checked={formState.omitCsvRowIfTableCreateSucceeded}
                        onChange={(e) => handleChange('omitCsvRowIfTableCreateSucceeded', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['OmitCsvRowIfTableCreateSucceeded']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.platform === 'Windows' && formState.advancedOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled
                          type="checkbox"
                          label="Use RWS Section For Table Values"
                          id="useRwsSectionForTableValues"
                          checked={!formState.doNotRwsSectionForTableValues}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['UseRwsSectionForTableValues']}</ReactMarkdown>
                      </Col>
                    </Row>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          type="checkbox"
                          label="Do Not Use RWS Section For Table Values"
                          id="doNotUseRwsSectionForTableValues"
                          checked={formState.doNotUseRwsSectionForTableValues}
                          onChange={(e) => handleChange('DoNotUseRwsSectionForTableValues', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['DoNotUseRwsSectionForTableValues']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.platform === 'Windows' && formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Use Non-Temporal AVX2 Routines"
                        id="useNonTemporalAvx2Routines"
                        checked={formState.useNonTemporalAvx2Routines}
                        onChange={(e) => handleChange('useNonTemporalAvx2Routines', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['UseNonTemporalAvx2Routines']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Clamp Number Of Edges"
                        id="clampNumberOfEdges"
                        checked={formState.clampNumberOfEdges}
                        onChange={(e) => handleChange('clampNumberOfEdges', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['ClampNumberOfEdges']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Use Original Seeded Hash Routines"
                        id="useOriginalSeededHashRoutines"
                        checked={formState.useOriginalSeededHashRoutines}
                        onChange={(e) => handleChange('useOriginalSeededHashRoutines', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['UseOriginalSeededHashRoutines']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Use Previous Table Size"
                        id="usePreviousTableSize"
                        checked={formState.usePreviousTableSize}
                        onChange={(e) => handleChange('usePreviousTableSize', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['UsePreviousTableSize']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Include Number Of Table Resize Events In Output Path"
                        id="includeNumberOfTableResizeEventsInOutputPath"
                        checked={formState.includeNumberOfTableResizeEventsInOutputPath}
                        onChange={(e) => handleChange('includeNumberOfTableResizeEventsInOutputPath', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['IncludeNumberOfTableResizeEventsInOutputPath']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Include Number Of Table Elements In Output Path"
                        id="includeNumberOfTableElementsInOutputPath"
                        checked={formState.includeNumberOfTableElementsInOutputPath}
                        onChange={(e) => handleChange('includeNumberOfTableElementsInOutputPath', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['IncludeNumberOfTableElementsInOutputPath']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Try Use Predicted Attempts To Limit Concurrency"
                        id="tryUsePredictedAttemptsToLimitConcurrency"
                        checked={formState.tryUsePredictedAttemptsToLimitMaxConcurrency}
                        onChange={(e) => handleChange('tryUsePredictedAttemptsToLimitConcurrency', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['TryUsePredictedAttemptsToLimitMaxConcurrency']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.advancedOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Rng Use Random Start Seed"
                        id="rngUseRandomStartSeed"
                        checked={formState.rngUseRandomStartSeed}
                        onChange={(e) => handleChange('rngUseRandomStartSeed', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['RngUseRandomStartSeed']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.platform === 'Windows' && formState.advancedOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled
                          type="checkbox"
                          label="Try Use AVX2 Hash Function"
                          id="tryUseAvx2HashFunction"
                          checked={!formState.doNotTryUseAvx2HashFunction}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['TryUseAvx2HashFunction']}</ReactMarkdown>
                      </Col>
                    </Row>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          type="checkbox"
                          label="Do Not Try Use AVX2 Hash Function"
                          id="doNotTryUseAvx2HashFunction"
                          checked={formState.doNotTryUseAvx2HashFunction}
                          onChange={(e) => handleChange('doNotTryUseAvx2HashFunction', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['DoNotTryUseAvx2HashFunction']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.platform === 'Windows' && formState.advancedOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Try Use AVX512 Hash Function"
                        id="tryUseAvx512HashFunction"
                        checked={formState.tryUseAvx512HashFunction}
                        onChange={(e) => handleChange('tryUseAvx512HashFunction', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['TryUseAvx512HashFunction']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.platform === 'Windows' && formState.advancedOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled
                          type="checkbox"
                          label="Try Use AVX2 Memory Coverage Function"
                          id="tryUseAvx2MemoryCoverageFunction"
                          checked={!formState.doNotTryUseAvx2MemoryCoverageFunction}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['TryUseAvx2MemoryCoverageFunction']}</ReactMarkdown>
                      </Col>
                    </Row>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          type="checkbox"
                          label="Do Not Try Use AVX2 Memory Coverage Function"
                          id="doNotTryUseAvx2MemoryCoverageFunction"
                          checked={formState.doNotTryUseAvx2MemoryCoverageFunction}
                          onChange={(e) => handleChange('doNotTryUseAvx2MemoryCoverageFunction', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['DoNotTryUseAvx2MemoryCoverageFunction']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.platform === 'Windows' && formState.advancedOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Try Use AVX512 Memory Coverage Function"
                        id="tryUseAvx512MemoryCoverageFunction"
                        checked={formState.tryUseAvx512MemoryCoverageFunction}
                        onChange={(e) => handleChange('tryUseAvx512MemoryCoverageFunction', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['TryUseAvx512MemoryCoverageFunction']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.advancedOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          disabled
                          type="checkbox"
                          label="Include Keys In Compiled Dll"
                          id="includeKeysInCompiledDll"
                          checked={!formState.doNotIncludeKeysInCompiledDll}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['IncludeKeysInCompiledDll']}</ReactMarkdown>
                      </Col>
                    </Row>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <Form.Check
                          type="checkbox"
                          label="Do Not Include Keys In Compiled Dll"
                          id="doNotIncludeKeysInCompiledDll"
                          checked={formState.doNotIncludeKeysInCompiledDll}
                          onChange={(e) => handleChange('doNotIncludeKeysInCompiledDll', e.target.checked)}
                        />
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['DoNotIncludeKeysInCompiledDll']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.advancedOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Disable Saving Callback Table Values"
                        id="disableSavingCallbackTableValues"
                        checked={formState.disableSavingCallbackTableValues}
                        onChange={(e) => handleChange('disableSavingCallbackTableValues', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['DisableSavingCallbackTableValues']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.advancedOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Do Not Try Use Hash16 Impl"
                        id="doNotTryUseHash16Impl"
                        checked={formState.doNotTryUseHash16Impl}
                        onChange={(e) => handleChange('doNotTryUseHash16Impl', e.target.checked)}
                      />
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['DoNotTryUseHash16Impl']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0" className="mb-3">
            <Accordion.Header>Table Create Parameters</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex flex-column">
                <Row className="align-items-center mb-3 border-bottom-thin">
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="graphImpl" label="Graph Implementation" className="mb-3">
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
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6} className="mt-2 mt-md-0">
                    <ReactMarkdown>{cli['GraphImpl']}</ReactMarkdown>
                  </Col>
                </Row>

                {!formState.findBestGraph && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="maxSolveTimeInSeconds"
                          label="Max Solve Time in Seconds"
                          className="mb-3"
                        >
                          <Form.Control
                            value={formState.maxSolveTimeInSeconds}
                            onChange={(e) => handleChange('maxSolveTimeInSeconds', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['MaxSolveTimeInSeconds']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="fixedAttempts" label="Fixed Attempts" className="mb-3">
                          <Form.Control
                            value={formState.fixedAttempts}
                            onChange={(e) => handleChange('fixedAttempts', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['FixedAttempts']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.advancedOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel controlId="valueSizeInBytes" label="Value Size In Bytes" className="mb-3">
                        <Form.Control
                          value={formState.valueSizeInBytes}
                          onChange={(e) => handleChange('valueSizeInBytes', e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['ValueSizeInBytes']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                <Row className="align-items-center mb-3 border-bottom-thin">
                  <Col xs={12} md={6}>
                    <FloatingLabel controlId="rng" label="Rng" className="mb-3">
                      <Form.Select value={formState.rng} onChange={(e) => handleChange('rng', e.target.value)}>
                        {/* Dynamically generate options from the Zod schema */}
                        {formSchema.shape.rng.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6} className="mt-2 mt-md-0">
                    <ReactMarkdown>{cli['Rng']}</ReactMarkdown>
                  </Col>
                </Row>

                {formState.rng === 'Philox43210' && formState.uncommonOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="rngSeed" label="Rng Seed" className="mb-3">
                          <Form.Control
                            value={formState.rngSeed}
                            onChange={(e) => handleChange('rngSeed', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['RngSeed']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="rngSubsequence" label="Rng Subsequence" className="mb-3">
                          <Form.Control
                            value={formState.rngSubsequence}
                            onChange={(e) => handleChange('rngSubsequence', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['RngSubsequence']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="rngOffset" label="Rng Offset" className="mb-3">
                          <Form.Control
                            value={formState.rngOffset}
                            onChange={(e) => handleChange('rngOffset', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['RngOffset']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.advancedOptions && (
                  <Row className="align-items-center mb-3 border-bottom-thin">
                    <Col xs={12} md={6}>
                      <FloatingLabel controlId="seeds" label="Seeds" className="mb-3">
                        <Form.Control value={formState.seeds} onChange={(e) => handleChange('seeds', e.target.value)} />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} className="mt-2 mt-md-0">
                      <ReactMarkdown>{cli['Seeds']}</ReactMarkdown>
                    </Col>
                  </Row>
                )}

                {formState.uncommonOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="seed3Byte1MaskCounts"
                          label="Seed 3 Byte 1 Mask Counts"
                          className="mb-3"
                        >
                          <Form.Control
                            value={formState.seed3Byte1MaskCounts}
                            onChange={(e) => handleChange('seed3Byte1MaskCounts', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['Seed3Byte1MaskCounts']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="seed3Byte2MaskCounts"
                          label="Seed 3 Byte 2 Mask Counts"
                          className="mb-3"
                        >
                          <Form.Control
                            value={formState.seed3Byte2MaskCounts}
                            onChange={(e) => handleChange('seed3Byte2MaskCounts', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['Seed3Byte2MaskCounts']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="solutionsFoundRatio" label="Solutions Found Ratio" className="mb-3">
                          <Form.Control
                            value={formState.solutionsFoundRatio}
                            onChange={(e) => handleChange('solutionsFoundRatio', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['SolutionsFoundRatio']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="attemptsBeforeTableResize"
                          label="Attempts Before Table Resize"
                          className="mb-3"
                        >
                          <Form.Control
                            value={formState.attemptsBeforeTableResize}
                            onChange={(e) => handleChange('attemptsBeforeTableResize', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['AttemptsBeforeTableResize']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="maxNumberOfTableResizes"
                          label="Max Number Of Table Resizes"
                          className="mb-3"
                        >
                          <Form.Control
                            value={formState.maxNumberOfTableResizes}
                            onChange={(e) => handleChange('maxNumberOfTableResizes', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['MaxNumberOfTableResizes']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="initialNumberOfTableResizes" label="Initial Number Of Table Resizes">
                          <Form.Control
                            value={formState.initialNumberOfTableResizes}
                            onChange={(e) => handleChange('initialNumberOfTableResizes', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['InitialNumberOfTableResizes']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="autoResizeWhenKeysToEdgesRatioExceeds"
                          label="Auto Resize When Keys-To-Edges Ratio Exceeds"
                        >
                          <Form.Control
                            value={formState.autoResizeWhenKeysToEdgesRatioExceeds}
                            onChange={(e) => handleChange('autoResizeWhenKeysToEdgesRatioExceeds', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['AutoResizeWhenKeysToEdgesRatioExceeds']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="mainWorkThreadpoolPriority" label="Main Work Threadpool Priority">
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
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['MainWorkThreadpoolPriority']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel controlId="fileWorkThreadpoolPriority" label="File Work Threadpool Priority">
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
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['FileWorkThreadpoolPriority']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}

                {formState.platform === 'Windows' && formState.uncommonOptions && (
                  <>
                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="functionHookCallbackDllPath"
                          label="Function Hook Callback Dll Path"
                          className="mb-3"
                        >
                          <Form.Control
                            value={formState.functionHookCallbackDllPath}
                            onChange={(e) => handleChange('functionHookCallbackDllPath', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['FunctionHookCallbackDllPath']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="functionHookCallbackFunctionName"
                          label="Function Hook Callback Function Name"
                          className="mb-3"
                        >
                          <Form.Control
                            value={formState.functionHookCallbackFunctionName}
                            onChange={(e) => handleChange('functionHookCallbackFunctionName', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['FunctionHookCallbackFunctionName']}</ReactMarkdown>
                      </Col>
                    </Row>

                    <Row className="align-items-center mb-3 border-bottom-thin">
                      <Col xs={12} md={6}>
                        <FloatingLabel
                          controlId="functionHookCallbackIgnoreRip"
                          label="Function Hook Callback Ignore RIP"
                          className="mb-3"
                        >
                          <Form.Control
                            value={formState.functionHookCallbackIgnoreRip}
                            onChange={(e) => handleChange('functionHookCallbackIgnoreRip', e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col xs={12} md={6} className="mt-2 mt-md-0">
                        <ReactMarkdown>{cli['FunctionHookCallbackIgnoreRip']}</ReactMarkdown>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0" className="mb-3">
            <Accordion.Header>Console Output Character Legend</Accordion.Header>
            <Accordion.Body>
              <Card>
                <Card.Body>
                  <Card.Title id="console-output" ref={consoleLegendRef}></Card.Title>
                  {/* prettier-ignore */}
                  <Card.Text>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{`
When the program is run in \`--Quiet\` mode, it will print a single character after
each table creation attempt, according to the following legend:

| Character | Meaning |
|-----------|---------|
|\`.\`   | Table created successfully. |
|\`+\`   | Table resize event occurred. |
|\`x\`   | Failed to create a table. The maximum number of attempts at trying to solve the table at a given size was reached, and no more resize attempts were possible (due to the maximum resize limit also being hit). |
|\`F\`   | Failed to create a table due to a target not being reached by a specific number of attempts. |
|\`*\`   | None of the worker threads were able to allocate sufficient memory to attempt solving the graph. |
|\`!\`   | The system is out of memory. |
|\`L\`   | The system is running low on memory (a low memory event is triggered at about 90% RAM usage). In certain situations, we can detect this situation prior to actually running out of memory; in these cases, we abort the current table creation attempt (which will instantly relieve system memory pressure).  (Windows only.) |
|\`V\`   | The graph was created successfully, however, we weren't able to allocate enough memory for the table values array in order for the array to be used after creation. This can be avoided by supplying the command line parameter \`--SkipTestAfterCreate\`. |
|\`T\`   | The requested number of table elements was too large. |
|\`S\`   | A shutdown event was received. This shouldn't be seen unless externally signaling the named shutdown event associated with a context.  (Windows only.) |
|\`t\`   | The solve timeout was reached before a solution was found. |
|\`?\`   | The error code isn't recognized! E-mail trent@trent.me with details. |
            `}
            </ReactMarkdown>
          </Card.Text>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

export default PerfectHashForm;
