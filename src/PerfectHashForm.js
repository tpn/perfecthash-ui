import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Accordion from "react-bootstrap/Accordion";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useImmer } from "use-immer";

import { z } from "zod";

// Helper function to format the current date and time
const getCurrentDateTimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

const formSchema = z.object({
  platform: z.enum(["Windows", "Linux"]),
  exeType: z.enum(["Create", "Bulk Create"]),
  keysPath: z.string(),
  keysDirectory: z.string(),
  outputDirectory: z.string(),
  algorithm: z.enum(["Chm01"]),
  hashFunction: z.enum([
    "Crc32Not",
    "Crc32RotateWXYZ",
    "Crc32RotateX",
    "Crc32RotateXY",
    "Crc32RotateXor",
    "Djb",
    "DjbXor",
    "Dummy",
    "Fnv",
    "Jenkins",
    "Multiply",
    "Multiply643ShiftR",
    "Multiply644ShiftR",
    "MultiplyRotateLR",
    "MultiplyRotateR",
    "MultiplyRotateR2",
    "MultiplyRotateRMultiply",
    "MultiplyShiftLR",
    "MultiplyShiftR",
    "MultiplyShiftR2",
    "MultiplyShiftRMultiply",
    "MultiplyShiftRX",
    "MultiplyXor",
    "RotateMultiplyXorRotate",
    "RotateMultiplyXorRotate2",
    "RotateRMultiply",
    "RotateRMultiplyRotateR",
    "RotateXor",
    "Scratch",
    "ShiftMultiplyXorShift",
    "ShiftMultiplyXorShift2",
  ]),
  maskFunction: z.enum(["And"]),
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
  hashAllKeysFirst: z.boolean(),
  enableWriteCombineForVertexPairs: z.boolean(),
  removeWriteCombineAfterSuccessfulHashKeys: z.boolean(),
  tryLargePagesForVertexPairs: z.boolean(),
  tryLargePagesForGraphEdgeAndVertexArrays: z.boolean(),
  tryLargePagesForGraphTableData: z.boolean(),
  usePreviousTableSize: z.boolean(),
  includeNumberOfTableResizeEventsInOutputPath: z.boolean(),
  includeNumberOfTableElementsInOutputPath: z.boolean(),
  rngUseRandomStartSeed: z.boolean(),
  tryUseAvx2HashFunction: z.boolean(),
  tryUseAvx512HashFunction: z.boolean(),
  doNotTryUseAvx2MemoryCoverageFunction: z.boolean(),
  includeKeysInCompiledDll: z.boolean(),
  disableSavingCallbackTableValues: z.boolean(),
  doNotTryUseHash16Impl: z.boolean(),
  tryUsePredictedAttemptsToLimitMaxConcurrency: z.boolean(),
  graphImpl: z.number().int().min(0),
  valueSizeInBytes: z.number().int().min(0),
  mainWorkThreadpoolPriority: z.enum(["Low", "Normal", "High"]),
  fileWorkThreadpoolPriority: z.enum(["Low", "Normal", "High"]),
  attemptsBeforeTableResize: z.number().int().min(0),
  maxNumberOfTableResizes: z.number().int().min(0),
  initialNumberOfTableResizes: z.number().int().min(0),
  autoResizeWhenKeysToEdgesRatioExceeds: z.number().min(0).max(1),
  bestCoverageAttempts: z.number().int().min(0),
  bestCoverageType: z.enum([
    "HighestMaxAssignedPerCacheLineCount",
    "HighestMaxGraphTraversalDepth",
    "HighestNumberOfCollisionsDuringAssignment",
    "HighestNumberOfEmptyCacheLines",
    "HighestNumberOfEmptyLargePages",
    "HighestNumberOfEmptyPages",
    "HighestNumberOfEmptyVertices",
    "HighestNumberOfUsedCacheLines",
    "HighestNumberOfUsedLargePages",
    "HighestNumberOfUsedPages",
    "HighestPredictedNumberOfFilledCacheLines",
    "HighestRank",
    "HighestScore",
    "HighestSlope",
    "HighestTotalGraphTraversals",
    "LowestMaxAssignedPerCacheLineCount",
    "LowestMaxGraphTraversalDepth",
    "LowestNumberOfCollisionsDuringAssignment",
    "LowestNumberOfEmptyCacheLines",
    "LowestNumberOfEmptyLargePages",
    "LowestNumberOfEmptyPages",
    "LowestNumberOfEmptyVertices",
    "LowestNumberOfUsedCacheLines",
    "LowestNumberOfUsedLargePages",
    "LowestNumberOfUsedPages",
    "LowestPredictedNumberOfFilledCacheLines",
    "LowestRank",
    "LowestScore",
    "LowestSlope",
    "LowestTotalGraphTraversals",
    "HighestMaxAssignedPerCacheLineCountForKeysSubset",
    "HighestNumberOfCacheLinesUsedByKeysSubset",
    "HighestNumberOfLargePagesUsedByKeysSubset",
    "HighestNumberOfPagesUsedByKeysSubset",
    "LowestMaxAssignedPerCacheLineCountForKeysSubset",
    "LowestNumberOfCacheLinesUsedByKeysSubset",
    "LowestNumberOfLargePagesUsedByKeysSubset",
    "LowestNumberOfPagesUsedByKeysSubset",
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
  rng: z.enum(["Philox43210", "System"]),
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
  exeType: "Create",
  algorithm: "Chm01",
  hashFunction: "MultiplyShiftR",
  maskFunction: "And",
  maxConcurrency: "0",
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
  useRwsSectionForTableValues: true,
  useNonTemporalAvx2Routines: false,
  clampNumberOfEdges: false,
  useOriginalSeededHashRoutines: false,
  hashAllKeysFirst: true,
  enableWriteCombineForVertexPairs: false,
  removeWriteCombineAfterSuccessfulHashKeys: false,
  tryLargePagesForVertexPairs: false,
  tryLargePagesForGraphEdgeAndVertexArrays: false,
  tryLargePagesForGraphTableData: false,
  usePreviousTableSize: false,
  includeNumberOfTableResizeEventsInOutputPath: false,
  includeNumberOfTableElementsInOutputPath: false,
  rngUseRandomStartSeed: false,
  tryUseAvx2HashFunction: true,
  tryUseAvx512HashFunction: false,
  doNotTryUseAvx2MemoryCoverageFunction: false,
  includeKeysInCompiledDll: true,
  disableSavingCallbackTableValues: false,
  doNotTryUseHash16Impl: false,
  tryUsePredictedAttemptsToLimitMaxConcurrency: false,
  graphImpl: 3,
  valueSizeInBytes: 4,
  mainWorkThreadpoolPriority: "Normal",
  fileWorkThreadpoolPriority: "Normal",
  attemptsBeforeTableResize: 4294967295,
  maxNumberOfTableResizes: 5,
  initialNumberOfTableResizes: 0,
  autoResizeWhenKeysToEdgesRatioExceeds: 0.0,
  bestCoverageAttempts: 5,
  bestCoverageType: "HighestScore",
  maxNumberOfEqualBestGraphs: 3,
  minNumberOfKeysForFindBestGraph: 512,
  bestCoverageTargetValue: null,
  keysSubset: "",
  targetNumberOfSolutions: "",
  fixedAttempts: "",
  seeds: "",
  seed3Byte1MaskCounts: "",
  solutionsFoundRatio: null,
  rng: "Philox43210",
  rngSeed: "0x2019090319811025",
  rngSubsequence: 0,
  rngOffset: 0,
  maxSolveTimeInSeconds: null,
  functionHookCallbackDllPath: "",
  functionHookCallbackFunctionName: "InterlockedIncrement",
  functionHookCallbackIgnoreRip: null,
  remark: "",
};

const initialFormStateWindows = {
  ...initialFormStateGeneric,
  platform: "Windows",
  keysPath: "c:\\src\\perfecthash-keys\\sys32\\HologramWorld-31016.keys",
  keysDirectory: "c:\\src\\perfecthash-keys\\sys32",
  outputDirectory: "c:\\Temp\\ph.out",
};

const initialFormStateLinux = {
  ...initialFormStateGeneric,
  platform: "Linux",
  keysPath: "~/src/perfecthash-keys/sys32/HologramWorld-31016.keys",
  keysDirectory: "~/src/perfecthash-keys/sys32",
  outputDirectory: "~/tmp/ph.out",
};

const PerfectHashForm = () => {

  //
  // Top-level state for form values.
  //

  const [platform, setPlatform] = useState("Windows"); // Windows|Linux
  const [exeType, setExeType] = useState("Create");    // Create|Bulk Create

  //
  // Mandatory arguments.
  //

  const [keysPath, setKeysPath] = useState("");
  const [keysDirectory, setKeysDirectory] = useState("");
  // Change keysPath and keysDirectory based on platform.
  useEffect(() => {
    if (platform === "Windows") {
      setKeysPath("c:\\src\\perfecthash-keys\\sys32\\HologramWorld-31016.keys");
      setKeysDirectory("c:\\src\\perfecthash-keys\\sys32");
    } else {
      setKeysPath("~/src/perfecthash-keys/sys32/HologramWorld-31016.keys");
      setKeysDirectory("~/src/perfecthash-keys/sys32");
    }
  }, [platform]);

  const [outputDirectory, setOutputDirectory] = useState("");
  // Change outputDirectory based on platform.
  useEffect(() => {
    const timestamp = getCurrentDateTimeString();
    if (platform === "Windows") {
      setOutputDirectory(`c:\\Temp\\ph.out.${timestamp}`);
    } else {
      setOutputDirectory(`~/tmp/ph.out.${timestamp}`);
    }
  }, [platform]);

  const [algorithm, setAlgorithm] = useState("Chm01");
  const [hashFunction, setHashFunction] = useState("MultiplyShiftR");
  const [maskFunction, setMaskFunction] = useState("And");
  const [maxConcurrency, setMaxConcurrency] = useState("0");

  //
  // Create flags.
  //

  const [skipTestAfterCreate, setSkipTestAfterCreate] = useState(false);
  const [compile, setCompile] = useState(false);

  //
  // Keys Load flags.
  //

  const [tryLargePagesForKeysData, setTryLargePagesForKeysData] = useState(false);
  const [skipKeysVerification, setSkipKeysVerification] = useState(false);
  const [disableImplicitKeyDownsizing, setDisableImplicitKeyDownsizing] = useState(false);
  const [tryInferKeySizeFromKeysFilename, setTryInferKeySizeFromKeysFilename] = useState(false);

  //
  // Table Create flags.
  //

  const [findBestGraph, setFindBestGraph] = useState(false);
  const [silent, setSilent] = useState(false);
  const [quiet, setQuiet] = useState(false);
  useEffect(() => {
    setQuiet(exeType === "Bulk Create" && !findBestGraph);
  }, [exeType, findBestGraph]);
  const [noFileIo, setNoFileIo] = useState(false);
  useEffect(() => {
    setNoFileIo(exeType === "Bulk Create");
  }, [exeType]);
  const [paranoid, setParanoid] = useState(false);
  const [skipGraphVerification, setSkipGraphVerification] = useState(false);
  const [disableCsvOutputFile, setDisableCsvOutputFile] = useState(false);
  const [omitCsvRowIfTableCreateFailed, setOmitCsvRowIfTableCreateFailed] = useState(false);
  const [omitCsvRowIfTableCreateSucceeded, setOmitCsvRowIfTableCreateSucceeded] = useState(false);
  const [indexOnly, setIndexOnly] = useState(false);
  const [useRwsSectionForTableValues, setUseRwsSectionForTableValues] = useState(true); // default to 'Use'
  const [useNonTemporalAvx2Routines, setUseNonTemporalAvx2Routines] = useState(false);
  const [clampNumberOfEdges, setClampNumberOfEdges] = useState(false);
  const [useOriginalSeededHashRoutines, setUseOriginalSeededHashRoutines] = useState(false);
  const [hashAllKeysFirst, setHashAllKeysFirst] = useState(true); // default to 'Hash All Keys First'
  const [enableWriteCombineForVertexPairs, setEnableWriteCombineForVertexPairs] = useState(false);
  const [removeWriteCombineAfterSuccessfulHashKeys, setRemoveWriteCombineAfterSuccessfulHashKeys] = useState(false);
  const [tryLargePagesForVertexPairs, setTryLargePagesForVertexPairs] = useState(false);
  const [tryLargePagesForGraphEdgeAndVertexArrays, setTryLargePagesForGraphEdgeAndVertexArrays] = useState(false);
  const [tryLargePagesForGraphTableData, setTryLargePagesForGraphTableData] = useState(false);
  const [usePreviousTableSize, setUsePreviousTableSize] = useState(false);
  const [includeNumberOfTableResizeEventsInOutputPath, setIncludeNumberOfTableResizeEventsInOutputPath] = useState(false);
  const [includeNumberOfTableElementsInOutputPath, setIncludeNumberOfTableElementsInOutputPath] = useState(false);
  const [rngUseRandomStartSeed, setRngUseRandomStartSeed] = useState(false);
  const [tryUseAvx2HashFunction, setTryUseAvx2HashFunction] = useState(true); // default to 'TryUseAvx2'
  const [tryUseAvx512HashFunction, setTryUseAvx512HashFunction] = useState(false);
  const [doNotTryUseAvx2MemoryCoverageFunction, setDoNotTryUseAvx2MemoryCoverageFunction] = useState(false);
  const [includeKeysInCompiledDll, setIncludeKeysInCompiledDll] = useState(true); // default to 'IncludeKeys'
  const [disableSavingCallbackTableValues, setDisableSavingCallbackTableValues] = useState(false);
  const [doNotTryUseHash16Impl, setDoNotTryUseHash16Impl] = useState(false);
  const [tryUsePredictedAttemptsToLimitMaxConcurrency, setTryUsePredictedAttemptsToLimitMaxConcurrency] = useState(false);

  //
  // Table Create parameters.
  //

  const [graphImpl, setGraphImpl] = useState(3); // default: 3
  const [valueSizeInBytes, setValueSizeInBytes] = useState(4); // default: 4
  const [mainWorkThreadpoolPriority, setMainWorkThreadpoolPriority] = useState("Normal"); // default: Normal
  const [fileWorkThreadpoolPriority, setFileWorkThreadpoolPriority] = useState("Normal"); // default: Normal
  const [attemptsBeforeTableResize, setAttemptsBeforeTableResize] = useState(4294967295); // default: 4,294,967,295
  const [maxNumberOfTableResizes, setMaxNumberOfTableResizes] = useState(5); // default: 5
  const [initialNumberOfTableResizes, setInitialNumberOfTableResizes] = useState(0); // default: 0
  const [autoResizeWhenKeysToEdgesRatioExceeds, setAutoResizeWhenKeysToEdgesRatioExceeds] = useState(0.0); // no default specified; requires 0.0 < D < 1.0
  const [bestCoverageAttempts, setBestCoverageAttempts] = useState(5); // positive integer
  const [bestCoverageType, setBestCoverageType] = useState("HighestScore"); // default: none
  const [maxNumberOfEqualBestGraphs, setMaxNumberOfEqualBestGraphs] = useState(3); // positive integer
  const [minNumberOfKeysForFindBestGraph, setMinNumberOfKeysForFindBestGraph] = useState(512); // default: 512
  const [bestCoverageTargetValue, setBestCoverageTargetValue] = useState(null); // flexible type based on context
  const [keysSubset, setKeysSubset] = useState(""); // string for comma-separated values
  const [targetNumberOfSolutions, setTargetNumberOfSolutions] = useState(""); // positive integer
  const [fixedAttempts, setFixedAttempts] = useState(""); // positive integer
  const [seeds, setSeeds] = useState(""); // string for comma-separated values
  const [seed3Byte1MaskCounts, setSeed3Byte1MaskCounts] = useState(""); // string for comma-separated 32 integers
  const [seed3Byte2MaskCounts, setSeed3Byte2MaskCounts] = useState(""); // string for comma-separated 32 integers
  const [solutionsFoundRatio, setSolutionsFoundRatio] = useState(null); // for double values
  const [rng, setRng] = useState("Philox43210"); // default: Philox43210
  const [rngSeed, setRngSeed] = useState("0x2019090319811025"); // default seed in hex
  const [rngSubsequence, setRngSubsequence] = useState(0); // default: 0
  const [rngOffset, setRngOffset] = useState(0); // default: 0
  const [maxSolveTimeInSeconds, setMaxSolveTimeInSeconds] = useState(null); // for integer seconds
  const [functionHookCallbackDllPath, setFunctionHookCallbackDllPath] = useState(""); // path to DLL
  const [functionHookCallbackFunctionName, setFunctionHookCallbackFunctionName] = useState("InterlockedIncrement"); // default function name
  const [functionHookCallbackIgnoreRip, setFunctionHookCallbackIgnoreRip] = useState(null); // integer RIP
  const [remark, setRemark] = useState(""); // remark string

  const exeTypeString = (exeType === "Create" ? "PerfectHashCreate" : "PerfectHashBulkCreate");
  const exeSuffix = (platform === "Windows" ? ".exe" : "");
  const exe = `${exeTypeString}${exeSuffix}`;

  //
  // If our exeType is Create, we use the keysPath as the keysTarget.
  // Otherwise, we use the keysDirectory as the keysTarget.
  //

  const keysTarget = (exeType === "Create" ? keysPath : keysDirectory);

  const command = `${exe} ${keysTarget} ${outputDirectory} ${algorithm} ${hashFunction} ${maskFunction} ${maxConcurrency}` +
    (skipTestAfterCreate ? " --SkipTestAfterCreate" : "") +
    (compile ? " --Compile" : "") +
    (tryLargePagesForKeysData ? " --TryLargePagesForKeysData" : "") +
    (skipKeysVerification ? " --SkipKeysVerification" : "") +
    (disableImplicitKeyDownsizing ? " --DisableImplicitKeyDownsizing" : "") +
    (tryInferKeySizeFromKeysFilename ? " --TryInferKeySizeFromKeysFilename" : "") +
    (silent ? " --Silent" : "") +
    (quiet ? " --Quiet" : "") +
    (noFileIo ? " --NoFileIo" : "") +
    (paranoid ? " --Paranoid" : "") +
    (skipGraphVerification ? " --SkipGraphVerification" : "") +
    (disableCsvOutputFile ? " --DisableCsvOutputFile" : "") +
    (omitCsvRowIfTableCreateFailed ? " --OmitCsvRowIfTableCreateFailed" : "") +
    (omitCsvRowIfTableCreateSucceeded ? " --OmitCsvRowIfTableCreateSucceeded" : "") +
    (indexOnly ? " --IndexOnly" : "") +
    (useRwsSectionForTableValues ? " --UseRwsSectionForTableValues" : " --DoNotUseRwsSectionForTableValues") +
    (useNonTemporalAvx2Routines ? " --UseNonTemporalAvx2Routines" : "") +
    (clampNumberOfEdges ? " --ClampNumberOfEdges" : "") +
    (useOriginalSeededHashRoutines ? " --UseOriginalSeededHashRoutines" : "") +
    (hashAllKeysFirst ? " --HashAllKeysFirst" : " --DoNotHashAllKeysFirst") +
    (enableWriteCombineForVertexPairs ? " --EnableWriteCombineForVertexPairs" : "") +
    (removeWriteCombineAfterSuccessfulHashKeys ? " --RemoveWriteCombineAfterSuccessfulHashKeys" : "") +
    (tryLargePagesForVertexPairs ? " --TryLargePagesForVertexPairs" : "") +
    (tryLargePagesForGraphEdgeAndVertexArrays ? " --TryLargePagesForGraphEdgeAndVertexArrays" : "") +
    (tryLargePagesForGraphTableData ? " --TryLargePagesForGraphTableData" : "") +
    (usePreviousTableSize ? " --UsePreviousTableSize" : "") +
    (includeNumberOfTableResizeEventsInOutputPath ? " --IncludeNumberOfTableResizeEventsInOutputPath" : "") +
    (includeNumberOfTableElementsInOutputPath ? " --IncludeNumberOfTableElementsInOutputPath" : "") +
    (rngUseRandomStartSeed ? " --RngUseRandomStartSeed" : "") +
    (tryUseAvx2HashFunction ? " --TryUseAvx2HashFunction" : " --DoNotTryUseAvx2HashFunction") +
    (tryUseAvx512HashFunction ? " --TryUseAvx512HashFunction" : "") +
    (doNotTryUseAvx2MemoryCoverageFunction ? " --DoNotTryUseAvx2MemoryCoverageFunction" : "") +
    (includeKeysInCompiledDll ? " --IncludeKeysInCompiledDll" : " --DoNotIncludeKeysInCompiledDll") +
    (disableSavingCallbackTableValues ? " --DisableSavingCallbackTableValues" : "") +
    (doNotTryUseHash16Impl ? " --DoNotTryUseHash16Impl" : "") +
    (tryUsePredictedAttemptsToLimitMaxConcurrency ? " --TryUsePredictedAttemptsToLimitMaxConcurrency" : "") +
    (findBestGraph ? " --FindBestGraph" : "") +

    // Table Create Parameters
    ` --GraphImpl=${graphImpl}` +
    ` --ValueSizeInBytes=${valueSizeInBytes}` +
    ` --MainWorkThreadpoolPriority=${mainWorkThreadpoolPriority}` +
    ` --FileWorkThreadpoolPriority=${fileWorkThreadpoolPriority}` +
    ` --AttemptsBeforeTableResize=${attemptsBeforeTableResize}` +
    ` --MaxNumberOfTableResizes=${maxNumberOfTableResizes}` +
    ` --InitialNumberOfTableResizes=${initialNumberOfTableResizes}` +
    (autoResizeWhenKeysToEdgesRatioExceeds ? ` --AutoResizeWhenKeysToEdgesRatioExceeds=${autoResizeWhenKeysToEdgesRatioExceeds}` : "") +
    (bestCoverageAttempts ? ` --BestCoverageAttempts=${bestCoverageAttempts}` : "") +
    (bestCoverageType ? ` --BestCoverageType=${bestCoverageType}` : "") +
    (maxNumberOfEqualBestGraphs ? ` --MaxNumberOfEqualBestGraphs=${maxNumberOfEqualBestGraphs}` : "") +
    (minNumberOfKeysForFindBestGraph ? ` --MinNumberOfKeysForFindBestGraph=${minNumberOfKeysForFindBestGraph}` : "") +
    (bestCoverageTargetValue !== null ? ` --BestCoverageTargetValue=${bestCoverageTargetValue}` : "") +
    (keysSubset ? ` --KeysSubset=${keysSubset}` : "") +
    (targetNumberOfSolutions ? ` --TargetNumberOfSolutions=${targetNumberOfSolutions}` : "") +
    (fixedAttempts ? ` --FixedAttempts=${fixedAttempts}` : "") +
    (seeds ? ` --Seeds=${seeds}` : "") +
    (seed3Byte1MaskCounts ? ` --Seed3Byte1MaskCounts=${seed3Byte1MaskCounts}` : "") +
    (seed3Byte2MaskCounts ? ` --Seed3Byte2MaskCounts=${seed3Byte2MaskCounts}` : "") +
    (solutionsFoundRatio !== null ? ` --SolutionsFoundRatio=${solutionsFoundRatio}` : "") +

    ` --Rng=${rng}` +
    (rngSeed ? ` --RngSeed=${rngSeed}` : "") +
    (rngSubsequence ? ` --RngSubsequence=${rngSubsequence}` : "") +
    (rngOffset ? ` --RngOffset=${rngOffset}` : "") +
    (maxSolveTimeInSeconds !== null ? ` --MaxSolveTimeInSeconds=${maxSolveTimeInSeconds}` : "") +
    (functionHookCallbackDllPath ? ` --FunctionHookCallbackDllPath=${functionHookCallbackDllPath}` : "") +
    (functionHookCallbackFunctionName ? ` --FunctionHookCallbackFunctionName=${functionHookCallbackFunctionName}` : "") +
    (functionHookCallbackIgnoreRip !== null ? ` --FunctionHookCallbackIgnoreRip=${functionHookCallbackIgnoreRip}` : "") +
    (remark ? ` --Remark="${remark}"` : "");

  useEffect(() => {
    // Copy command to clipboard whenever it changes
    if (command) {
      navigator.clipboard.writeText(command).catch((err) =>
        console.error("Failed to copy command to clipboard:", err)
      );
    }
  }, [command]);

  useEffect(() => {
    // Create script element for Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-Y70DZ1DVYT';
    document.head.appendChild(script1);

    // Create script element for gtag configuration
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y70DZ1DVYT');
    `;
    document.head.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div style={{ minWidth: "600px", maxWidth: "1800px", margin: "auto", padding: "20px" }}>
      <small>
        N.B. This tool was hacked together in a single evening.  I don't know React, JavaScript,
        or any web dev.  ChatGPT authored the vast majority of this code via my prompts.<br />
        <a href="https://github.com/tpn/perfecthash-ui/blob/main/src/PerfectHashForm.js" target="_blank" rel="noreferrer">GitHub</a>
        | <a href="https://trent.me" target="_blank" rel="noreferrer">Trent Nelson</a>
      </small>
      <h2>PerfectHashCreate Command Generator</h2>

      <div>
        <label>Platform:</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="Windows">Windows</option>
          <option value="Linux">Linux</option>
        </select>
      </div>

      <div>
        <label>Executable Type:</label>
        <select
          value={exeType}
          onChange={(e) => setExeType(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="Create">Create</option>
          <option value="Bulk Create">Bulk Create</option>
        </select>
      </div>

      {/* Conditionally render Keys Path or Keys Directory based on exeType */}
      {exeType === "Create" ? (
        <div id="keys-path">
          <label>Keys Path:</label>
          <input
            type="text"
            value={keysPath}
            onChange={(e) => setKeysPath(e.target.value)}
            placeholder="Enter keys file path"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
      ) : (
        <div id="keys-dir">
          <label>Keys Directory:</label>
          <input
            type="text"
            value={keysDirectory}
            onChange={(e) => setKeysDirectory(e.target.value)}
            placeholder="Enter keys directory"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
      )}

      <div>
        <label>Output Directory:</label>
        <input
          type="text"
          value={outputDirectory}
          onChange={(e) => setOutputDirectory(e.target.value)}
          placeholder="Enter output directory"
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>

      <div>
        <label>Algorithm:</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="Chm01">Chm01</option>
        </select>
      </div>

      <div>
        <label>Hash Function:</label>
        <select
          value={hashFunction}
          onChange={(e) => setHashFunction(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="MultiplyRotateR2">MultiplyRotateR2</option>
          <option value="MultiplyShiftR">MultiplyShiftR</option>
          <option value="MultiplyShiftRX">MultiplyShiftRX</option>
          <option value="RotateMultiplyXorRotate">RotateMultiplyXorRotate</option>
          <option value="ShiftMultiplyXorShift">ShiftMultiplyXorShift</option>
          <option value="ShiftMultiplyXorShift2">ShiftMultiplyXorShift2</option>
          <option value="RotateMultiplyXorRotate2">RotateMultiplyXorRotate2</option>
          <option value="MultiplyRotateR">MultiplyRotateR</option>
          <option value="MultiplyRotateLR">MultiplyRotateLR</option>
          <option value="MultiplyShiftLR">MultiplyShiftLR</option>
          <option value="Multiply">Multiply</option>
          <option value="MultiplyXor">MultiplyXor</option>
          <option value="MultiplyRotateRMultiply">MultiplyRotateRMultiply</option>
          <option value="MultiplyShiftRMultiply">MultiplyShiftRMultiply</option>
          <option value="MultiplyShiftR2">MultiplyShiftR2</option>
          <option value="RotateRMultiply">RotateRMultiply</option>
          <option value="RotateRMultiplyRotateR">RotateRMultiplyRotateR</option>
          <option value="Jenkins">Jenkins</option>
          <option value="RotateXor">RotateXor</option>
          <option value="Dummy">Dummy</option>
          <option value="Crc32RotateXor">Crc32RotateXor</option>
          <option value="Djb">Djb</option>
          <option value="DjbXor">DjbXor</option>
          <option value="Fnv">Fnv</option>
          <option value="Crc32Not">Crc32Not</option>
          <option value="Crc32RotateX">Crc32RotateX</option>
          <option value="Crc32RotateXY">Crc32RotateXY</option>
          <option value="Crc32RotateWXYZ">Crc32RotateWXYZ</option>
          <option value="Multiply643ShiftR">Multiply643ShiftR</option>
          <option value="Multiply644ShiftR">Multiply644ShiftR</option>
          <option value="Scratch">Scratch</option>
        </select>
      </div>

      <div>
        <label>Mask Function:</label>
        <select
          value={maskFunction}
          onChange={(e) => setMaskFunction(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="And">And</option>
        </select>
      </div>

      <div>
        <label>Maximum Concurrency:</label>
        <input
          type="number"
          min="1"
          max="127"
          value={maxConcurrency}
          onChange={(e) => setMaxConcurrency(e.target.value)}
          placeholder="Enter max concurrency"
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>



      <div style={{ display: "table", marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
        <h3>Create Flags</h3>

        <div
          style={{
            display: "table-row",
            border: "2px solid blue",
            padding: "10px",
          }}
        >
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid blue" }}>
            <input
              type="checkbox"
              checked={skipTestAfterCreate}
              onChange={(e) => setSkipTestAfterCreate(e.target.checked)}
              id="skipTestAfterCreate"
            />
            <label htmlFor="skipTestAfterCreate" style={{ marginLeft: "8px" }}>
              Skip Test After Create
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid blue", verticalAlign: "top" }}>
            <span>
              Normally, after a table has been successfully created, it is tested. Setting
              this flag disables this behavior. <br />
              <strong>Note:</strong> This will also disable benchmarking, so no
              performance information will be present in the .csv output file.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "table-row",
            border: "2px solid blue",
            padding: "10px",
          }}
        >
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid blue" }}>
            <input
              type="checkbox"
              checked={compile}
              onChange={(e) => setCompile(e.target.checked)}
              id="compile"
            />
            <label htmlFor="compile" style={{ marginLeft: "8px" }}>
              Compile
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid blue", verticalAlign: "top" }}>
            <span>
              Compiles the table after creation. <br />
              <strong>Note:</strong> msbuild.exe must be on the PATH environment
              variable for this to work.
            </span>
          </div>
        </div>
      </div>


      <div style={{ display: "table", marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
        <h3>Keys Load Flags</h3>

        <div
          style={{
            display: "table-row",
            border: "2px solid green",
            padding: "10px",
          }}
        >
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid green" }}>
            <input
              type="checkbox"
              checked={tryLargePagesForKeysData}
              onChange={(e) => setTryLargePagesForKeysData(e.target.checked)}
              id="tryLargePagesForKeysData"
            />
            <label htmlFor="tryLargePagesForKeysData" style={{ marginLeft: "8px" }}>
              Try Large Pages For Keys Data
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid green", verticalAlign: "top" }}>
            <span>Tries to allocate the keys buffer using large pages.</span>
          </div>
        </div>

        <div
          style={{
            display: "table-row",
            border: "2px solid green",
            padding: "10px",
          }}
        >
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid green" }}>
            <input
              type="checkbox"
              checked={skipKeysVerification}
              onChange={(e) => setSkipKeysVerification(e.target.checked)}
              id="skipKeysVerification"
            />
            <label htmlFor="skipKeysVerification" style={{ marginLeft: "8px" }}>
              Skip Keys Verification
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid green", verticalAlign: "top" }}>
            <span>Skips the logic that verifies and sorts keys after loading, speeding up large key set loads.</span>
          </div>
        </div>

        <div
          style={{
            display: "table-row",
            border: "2px solid green",
            padding: "10px",
          }}
        >
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid green" }}>
            <input
              type="checkbox"
              checked={disableImplicitKeyDownsizing}
              onChange={(e) => setDisableImplicitKeyDownsizing(e.target.checked)}
              id="disableImplicitKeyDownsizing"
            />
            <label htmlFor="disableImplicitKeyDownsizing" style={{ marginLeft: "8px" }}>
              Disable Implicit Key Downsizing
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid green", verticalAlign: "top" }}>
            <span>Prevents automatic downscaling of 64-bit keys to 32-bit when appropriate, conserving memory.</span>
          </div>
        </div>

        <div
          style={{
            display: "table-row",
            border: "2px solid green",
            padding: "10px",
          }}
        >
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid green" }}>
            <input
              type="checkbox"
              checked={tryInferKeySizeFromKeysFilename}
              onChange={(e) => setTryInferKeySizeFromKeysFilename(e.target.checked)}
              id="tryInferKeySizeFromKeysFilename"
            />
            <label htmlFor="tryInferKeySizeFromKeysFilename" style={{ marginLeft: "8px" }}>
              Try Infer Key Size From Keys Filename
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid green", verticalAlign: "top" }}>
            <span>Determines key size from the file name if it ends with "64.keys", defaulting to 32-bit otherwise.</span>
          </div>
        </div>
      </div>


      <div style={{ display: "table", marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
        <h3>Table Create Flags</h3>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="checkbox"
              id="findBestGraph"
              checked={findBestGraph}
              onChange={(e) => setFindBestGraph(e.target.checked)}
            />
            <label htmlFor="findBestGraph" style={{ marginLeft: "8px" }}>
              Find Best Graph
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Requires <code>--BestCoverageAttempts=N</code> and <code>--BestCoverageType=&lt;CoverageType&gt;</code>.
              The table create routine will run until it finds the specified number of best coverage attempts,
              saving the best graph based on the coverage type predicate. <br /><br />

              <strong>Note:</strong> This option is significantly more CPU intensive than <code>--FirstGraphWins</code> mode,
              but is more likely to yield a superior graph.
            </span>
          </div>
        </div>


        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={silent}
              onChange={(e) => setSilent(e.target.checked)}
              id="silent"
            />
            <label htmlFor="silent" style={{ marginLeft: "8px" }}>Silent</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>Disables console printing of dots, dashes, and other characters for visualization.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={quiet}
              onChange={(e) => setQuiet(e.target.checked)}
              id="quiet"
            />
            <label htmlFor="quiet" style={{ marginLeft: "8px" }}>Quiet</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>Disables printing best graph information to the console.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={noFileIo}
              onChange={(e) => setNoFileIo(e.target.checked)}
              id="noFileIo"
            />
            <label htmlFor="noFileIo" style={{ marginLeft: "8px" }}>No File I/O</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>Disables writing of all files after finding a perfect hash solution.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={paranoid}
              onChange={(e) => setParanoid(e.target.checked)}
              id="paranoid"
            />
            <label htmlFor="paranoid" style={{ marginLeft: "8px" }}>Paranoid</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>Enables redundant checks for ensuring acyclic graphs.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <div>
              <input
                type="radio"
                id="useRws"
                name="rwsSection"
                value="use"
                checked={useRwsSectionForTableValues}
                onChange={() => setUseRwsSectionForTableValues(true)}
              />
              <label htmlFor="useRws" style={{ marginLeft: "8px" }}>Use RWS Section for Table Values</label>
            </div>
            <div style={{ marginTop: "8px" }}>
              <input
                type="radio"
                id="doNotUseRws"
                name="rwsSection"
                value="doNotUse"
                checked={!useRwsSectionForTableValues}
                onChange={() => setUseRwsSectionForTableValues(false)}
              />
              <label htmlFor="doNotUseRws" style={{ marginLeft: "8px" }}>Do Not Use RWS Section for Table Values</label>
            </div>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>Allows the linker to use a shared read-write section for the table values array, accessible across multiple processes.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={skipGraphVerification}
              onChange={(e) => setSkipGraphVerification(e.target.checked)}
              id="skipGraphVerification"
            />
            <label htmlFor="skipGraphVerification" style={{ marginLeft: "8px" }}>Skip Graph Verification</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>Skips the internal graph verification to ensure no collisions across the key set.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={disableCsvOutputFile}
              onChange={(e) => setDisableCsvOutputFile(e.target.checked)}
              id="disableCsvOutputFile"
            />
            <label htmlFor="disableCsvOutputFile" style={{ marginLeft: "8px" }}>
              Disable CSV Output File
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              When present, disables writing the .csv output file. This is required when
              running multiple instances of the tool against the same output directory in parallel.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={omitCsvRowIfTableCreateFailed}
              onChange={(e) => setOmitCsvRowIfTableCreateFailed(e.target.checked)}
              id="omitCsvRowIfTableCreateFailed"
            />
            <label htmlFor="omitCsvRowIfTableCreateFailed" style={{ marginLeft: "8px" }}>
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Omits writing a row in the .csv output file if table creation fails for a given keys file.
              Ignored if Disable CSV Output File is specified.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={omitCsvRowIfTableCreateSucceeded}
              onChange={(e) => setOmitCsvRowIfTableCreateSucceeded(e.target.checked)}
              id="omitCsvRowIfTableCreateSucceeded"
            />
            <label htmlFor="omitCsvRowIfTableCreateSucceeded" style={{ marginLeft: "8px" }}>
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Omits writing a row in the .csv output file if table creation succeeded for a given keys file.
              Ignored if Disable CSV Output File is specified.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={indexOnly}
              onChange={(e) => setIndexOnly(e.target.checked)}
              id="indexOnly"
            />
            <label htmlFor="indexOnly" style={{ marginLeft: "8px" }}>
              Index Only
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              When set, affects the generated C files by defining the C preprocessor macro CPH_INDEX_ONLY,
              which omits the compiled perfect hash routines that deal with the underlying table values array.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={useNonTemporalAvx2Routines}
              onChange={(e) => setUseNonTemporalAvx2Routines(e.target.checked)}
              id="useNonTemporalAvx2Routines"
            />
            <label htmlFor="useNonTemporalAvx2Routines" style={{ marginLeft: "8px" }}>
              Use Non-Temporal AVX2 Routines
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Uses implementations of RtlCopyPages and RtlFillPages with non-temporal hints.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={clampNumberOfEdges}
              onChange={(e) => setClampNumberOfEdges(e.target.checked)}
              id="clampNumberOfEdges"
            />
            <label htmlFor="clampNumberOfEdges" style={{ marginLeft: "8px" }}>
              Clamp Number of Edges
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Clamps the number of edges to always equal the number of keys, rounded up to a power of two,
              regardless of current table resizes. Used in research on the impact of edge numbers on graph solving probability.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={useOriginalSeededHashRoutines}
              onChange={(e) => setUseOriginalSeededHashRoutines(e.target.checked)}
              id="useOriginalSeededHashRoutines"
            />
            <label htmlFor="useOriginalSeededHashRoutines" style={{ marginLeft: "8px" }}>
              Use Original Seeded Hash Routines
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Uses the original (slower) seeded hash routines. <br />
              <strong>Note:</strong> Incompatible with <code>--HashAllKeysFirst</code>.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="checkbox"
              id="tryUsePredictedAttemptsToLimitMaxConcurrency"
              checked={tryUsePredictedAttemptsToLimitMaxConcurrency}
              onChange={(e) => setTryUsePredictedAttemptsToLimitMaxConcurrency(e.target.checked)}
            />
            <label htmlFor="tryUsePredictedAttemptsToLimitMaxConcurrency" style={{ marginLeft: "8px" }}>
              Try Use Predicted Attempts to Limit Max Concurrency
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Requires <code>--SolutionsFoundRatio=&lt;double&gt;</code>, which is then used to calculate the predicted
              number of attempts required to solve a given graph, allowing us to limit maximum concurrency when solving
              to the minimum of the predicted attempts and the maximum concurrency indicated on the command line.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={removeWriteCombineAfterSuccessfulHashKeys}
              onChange={(e) => setRemoveWriteCombineAfterSuccessfulHashKeys(e.target.checked)}
              id="removeWriteCombineAfterSuccessfulHashKeys"
            />
            <label htmlFor="removeWriteCombineAfterSuccessfulHashKeys" style={{ marginLeft: "8px" }}>
              Remove Write Combine After Successful Hash Keys
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Changes the vertex pairs array’s page protection from <code>PAGE_READWRITE|PAGE_WRITECOMBINE</code> to <code>PAGE_READONLY</code> after successful hashing. <br />
              <strong>Note:</strong> Requires both <code>--EnableWriteCombineForVertexPairs</code> and <code>--HashAllKeysFirst</code> flags.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={tryLargePagesForVertexPairs}
              onChange={(e) => setTryLargePagesForVertexPairs(e.target.checked)}
              id="tryLargePagesForVertexPairs"
            />
            <label htmlFor="tryLargePagesForVertexPairs" style={{ marginLeft: "8px" }}>
              Try Large Pages For Vertex Pairs
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Attempts to allocate the vertex pairs array using large pages. <br />
              <strong>Note:</strong> Only applies when <code>--HashAllKeysFirst</code> is set. Incompatible with <code>--EnableWriteCombineForVertexPairs</code>.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={tryLargePagesForGraphEdgeAndVertexArrays}
              onChange={(e) => setTryLargePagesForGraphEdgeAndVertexArrays(e.target.checked)}
              id="tryLargePagesForGraphEdgeAndVertexArrays"
            />
            <label htmlFor="tryLargePagesForGraphEdgeAndVertexArrays" style={{ marginLeft: "8px" }}>
              Try Large Pages For Graph Edge And Vertex Arrays
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Allocates the edge and vertex arrays for graphs during solving with large pages.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={tryLargePagesForGraphTableData}
              onChange={(e) => setTryLargePagesForGraphTableData(e.target.checked)}
              id="tryLargePagesForGraphTableData"
            />
            <label htmlFor="tryLargePagesForGraphTableData" style={{ marginLeft: "8px" }}>
              Try Large Pages For Graph Table Data
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Allocates the table data used by graphs during solving with large pages.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
            <input
              type="checkbox"
              checked={usePreviousTableSize}
              onChange={(e) => setUsePreviousTableSize(e.target.checked)}
              id="usePreviousTableSize"
            />
            <label htmlFor="usePreviousTableSize" style={{ marginLeft: "8px" }}>
              Use Previous Table Size
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
            <span>
              Uses previously recorded table sizes associated with the keys file for the current algorithm, hash function, and masking type. <br />
              <strong>Note:</strong> To delete previously recorded sizes for all keys, use the following PowerShell command:
              <pre style={{ backgroundColor: "#f5f5f5", padding: "8px", marginTop: "5px" }}>
          PS C:\Temp\keys> Get-Item -Path *.keys -Stream *.TableSize | Remove-Item
              </pre>
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid purple", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid purple" }}>
            <input
              type="checkbox"
              checked={includeNumberOfTableResizeEventsInOutputPath}
              onChange={(e) => setIncludeNumberOfTableResizeEventsInOutputPath(e.target.checked)}
              id="includeNumberOfTableResizeEventsInOutputPath"
            />
            <label htmlFor="includeNumberOfTableResizeEventsInOutputPath" style={{ marginLeft: "8px" }}>
              Include Number Of Table Resize Events In Output Path
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid purple", verticalAlign: "top" }}>
            <span>
              Adds the number of table resize events encountered during hash table creation into the output path.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid purple", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid purple" }}>
            <input
              type="checkbox"
              checked={includeNumberOfTableElementsInOutputPath}
              onChange={(e) => setIncludeNumberOfTableElementsInOutputPath(e.target.checked)}
              id="includeNumberOfTableElementsInOutputPath"
            />
            <label htmlFor="includeNumberOfTableElementsInOutputPath" style={{ marginLeft: "8px" }}>
              Include Number Of Table Elements In Output Path
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid purple", verticalAlign: "top" }}>
            <span>
              Incorporates the final number of table elements into the output path, useful for tracking table sizes.
              <br />
              <strong>Note:</strong> These two flags can be combined to include both resize events and elements in the path.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid purple", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid purple" }}>
            <input
              type="checkbox"
              checked={rngUseRandomStartSeed}
              onChange={(e) => setRngUseRandomStartSeed(e.target.checked)}
              id="rngUseRandomStartSeed"
            />
            <label htmlFor="rngUseRandomStartSeed" style={{ marginLeft: "8px" }}>
              RNG Use Random Start Seed
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid purple", verticalAlign: "top" }}>
            <span>
              Initializes the RNG with a random seed obtained from the OS if set. <br />
              <strong>Note:</strong> For benchmarking performance, avoid this flag to ensure comparable runs.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid purple", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid purple" }}>
            <div>
              <input
                type="radio"
                id="tryUseAvx2"
                name="avx2HashFunction"
                value="tryUse"
                checked={tryUseAvx2HashFunction}
                onChange={() => setTryUseAvx2HashFunction(true)}
              />
              <label htmlFor="tryUseAvx2" style={{ marginLeft: "8px" }}>Try Use AVX2 Hash Function</label>
            </div>
            <div style={{ marginTop: "8px" }}>
              <input
                type="radio"
                id="doNotTryUseAvx2"
                name="avx2HashFunction"
                value="doNotTryUse"
                checked={!tryUseAvx2HashFunction}
                onChange={() => setTryUseAvx2HashFunction(false)}
              />
              <label htmlFor="doNotTryUseAvx2" style={{ marginLeft: "8px" }}>Do Not Try Use AVX2 Hash Function</label>
            </div>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid purple", verticalAlign: "top" }}>
            <span>
              Tries to use optimized AVX2 routines for hashing keys if applicable. <br />
              <strong>Note:</strong> Only applies when <code>HashAllKeysFirst</code> is set.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid teal", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal" }}>
            <input
              type="checkbox"
              checked={tryUseAvx512HashFunction}
              onChange={(e) => setTryUseAvx512HashFunction(e.target.checked)}
              id="tryUseAvx512HashFunction"
            />
            <label htmlFor="tryUseAvx512HashFunction" style={{ marginLeft: "8px" }}>
              Try Use AVX512 Hash Function
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal", verticalAlign: "top" }}>
            <span>
              Uses optimized AVX512 routines for hashing keys, if applicable. <br />
              <strong>Note:</strong> Only applies when <code>HashAllKeysFirst</code> is set.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid teal", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal" }}>
            <input
              type="checkbox"
              checked={doNotTryUseAvx2MemoryCoverageFunction}
              onChange={(e) => setDoNotTryUseAvx2MemoryCoverageFunction(e.target.checked)}
              id="doNotTryUseAvx2MemoryCoverageFunction"
            />
            <label htmlFor="doNotTryUseAvx2MemoryCoverageFunction" style={{ marginLeft: "8px" }}>
              Do Not Try Use AVX2 Memory Coverage Function
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal", verticalAlign: "top" }}>
            <span>
              Disables the automatic use of the AVX2 memory coverage calculation routine when AVX2 support is detected.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid teal", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal" }}>
            <div>
              <input
                type="radio"
                id="includeKeysInDll"
                name="compiledDllKeys"
                value="include"
                checked={includeKeysInCompiledDll}
                onChange={() => setIncludeKeysInCompiledDll(true)}
              />
              <label htmlFor="includeKeysInDll" style={{ marginLeft: "8px" }}>Include Keys In Compiled DLL</label>
            </div>
            <div style={{ marginTop: "8px" }}>
              <input
                type="radio"
                id="doNotIncludeKeysInDll"
                name="compiledDllKeys"
                value="doNotInclude"
                checked={!includeKeysInCompiledDll}
                onChange={() => setIncludeKeysInCompiledDll(false)}
              />
              <label htmlFor="doNotIncludeKeysInDll" style={{ marginLeft: "8px" }}>Do Not Include Keys In Compiled DLL</label>
            </div>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal", verticalAlign: "top" }}>
            <span>
              Includes keys in the compiled DLL file, useful for benchmarking index routines against binary search routines.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid teal", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal" }}>
            <input
              type="checkbox"
              checked={disableSavingCallbackTableValues}
              onChange={(e) => setDisableSavingCallbackTableValues(e.target.checked)}
              id="disableSavingCallbackTableValues"
            />
            <label htmlFor="disableSavingCallbackTableValues" style={{ marginLeft: "8px" }}>
              Disable Saving Callback Table Values
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal", verticalAlign: "top" }}>
            <span>
              Prevents the runtime from saving callback table values when running with a _penter-hooked binary.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid teal", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal" }}>
            <input
              type="checkbox"
              checked={doNotTryUseHash16Impl}
              onChange={(e) => setDoNotTryUseHash16Impl(e.target.checked)}
              id="doNotTryUseHash16Impl"
            />
            <label htmlFor="doNotTryUseHash16Impl" style={{ marginLeft: "8px" }}>
              Do Not Try Use Hash16 Impl
            </label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid teal", verticalAlign: "top" }}>
            <span>
              Disables the default 16-bit hash implementation, which may enhance performance when certain conditions exist
              (e.g., Algorithm is Chm01, GraphImpl is 3, number of vertices &lt;= MAX_USHORT-1). Intended mainly for debugging.
            </span>
          </div>
        </div>

      </div>

      <div style={{ display: "table", marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
        <h3>Table Create Parameters</h3>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="graphImpl">Graph Implementation</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <select
              id="graphImpl"
              value={graphImpl}
              onChange={(e) => setGraphImpl(parseInt(e.target.value))}
              style={{ width: "100%" }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Selects the backend version of the graph assignment step.
              Version 1 matches the original CHM algorithm, version 2 is faster,
              and version 3 is even faster with additional improvements.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="valueSizeInBytes">Value Size In Bytes</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <select
              id="valueSizeInBytes"
              value={valueSizeInBytes}
              onChange={(e) => setValueSizeInBytes(parseInt(e.target.value))}
              style={{ width: "100%" }}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Sets the size, in bytes, of the value element to be stored in the compiled perfect hash table via Insert().</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="mainWorkThreadpoolPriority">Main Work Threadpool Priority</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <select
              id="mainWorkThreadpoolPriority"
              value={mainWorkThreadpoolPriority}
              onChange={(e) => setMainWorkThreadpoolPriority(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Sets the priority level for the main work (CPU-intensive) threadpool.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="fileWorkThreadpoolPriority">File Work Threadpool Priority</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <select
              id="fileWorkThreadpoolPriority"
              value={fileWorkThreadpoolPriority}
              onChange={(e) => setFileWorkThreadpoolPriority(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Sets the priority level for the file work threadpool.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="attemptsBeforeTableResize">Attempts Before Table Resize</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="attemptsBeforeTableResize"
              value={attemptsBeforeTableResize}
              onChange={(e) => setAttemptsBeforeTableResize(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Specifies the number of graph-solving attempts before a resize event occurs.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="maxNumberOfTableResizes">Max Number of Table Resizes</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="maxNumberOfTableResizes"
              value={maxNumberOfTableResizes}
              onChange={(e) => setMaxNumberOfTableResizes(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Maximum number of permitted table resizes before stopping.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="initialNumberOfTableResizes">Initial Number of Table Resizes</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="initialNumberOfTableResizes"
              value={initialNumberOfTableResizes}
              onChange={(e) => setInitialNumberOfTableResizes(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Simulates a starting number of table resizes to improve solving probability.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="autoResizeWhenKeysToEdgesRatioExceeds">Auto Resize When Keys to Edges Ratio Exceeds</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="autoResizeWhenKeysToEdgesRatioExceeds"
              value={autoResizeWhenKeysToEdgesRatioExceeds}
              onChange={(e) => setAutoResizeWhenKeysToEdgesRatioExceeds(parseFloat(e.target.value))}
              step="0.01"
              min="0.01"
              max="0.99"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Specifies a keys-to-edges ratio threshold for auto-resizing.
              Valid values are between 0.01 and 0.99.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="bestCoverageAttempts">Best Coverage Attempts</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="bestCoverageAttempts"
              value={bestCoverageAttempts}
              onChange={(e) => setBestCoverageAttempts(parseInt(e.target.value))}
              min="1"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Number of attempts to find the best graph based on coverage criteria.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="bestCoverageType">Best Coverage Type</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <select
              id="bestCoverageType"
              value={bestCoverageType}
              onChange={(e) => setBestCoverageType(e.target.value)}
              style={{ width: "100%" }}
            >
              {/* Main valid coverage types */}
              <option value="HighestNumberOfEmptyPages">HighestNumberOfEmptyPages</option>
              <option value="LowestNumberOfEmptyPages">LowestNumberOfEmptyPages</option>

              <option value="HighestNumberOfEmptyLargePages">HighestNumberOfEmptyLargePages</option>
              <option value="LowestNumberOfEmptyLargePages">LowestNumberOfEmptyLargePages</option>

              <option value="HighestNumberOfEmptyCacheLines">HighestNumberOfEmptyCacheLines</option>
              <option value="LowestNumberOfEmptyCacheLines">LowestNumberOfEmptyCacheLines</option>

              <option value="HighestNumberOfUsedPages">HighestNumberOfUsedPages</option>
              <option value="LowestNumberOfUsedPages">LowestNumberOfUsedPages</option>

              <option value="HighestNumberOfUsedLargePages">HighestNumberOfUsedLargePages</option>
              <option value="LowestNumberOfUsedLargePages">LowestNumberOfUsedLargePages</option>

              <option value="HighestNumberOfUsedCacheLines">HighestNumberOfUsedCacheLines</option>
              <option value="LowestNumberOfUsedCacheLines">LowestNumberOfUsedCacheLines</option>

              <option value="HighestMaxGraphTraversalDepth">HighestMaxGraphTraversalDepth</option>
              <option value="LowestMaxGraphTraversalDepth">LowestMaxGraphTraversalDepth</option>

              <option value="HighestTotalGraphTraversals">HighestTotalGraphTraversals</option>
              <option value="LowestTotalGraphTraversals">LowestTotalGraphTraversals</option>

              <option value="HighestNumberOfEmptyVertices">HighestNumberOfEmptyVertices</option>
              <option value="LowestNumberOfEmptyVertices">LowestNumberOfEmptyVertices</option>

              <option value="HighestNumberOfCollisionsDuringAssignment">HighestNumberOfCollisionsDuringAssignment</option>
              <option value="LowestNumberOfCollisionsDuringAssignment">LowestNumberOfCollisionsDuringAssignment</option>

              <option value="HighestMaxAssignedPerCacheLineCount">HighestMaxAssignedPerCacheLineCount</option>
              <option value="LowestMaxAssignedPerCacheLineCount">LowestMaxAssignedPerCacheLineCount</option>

              <option value="HighestPredictedNumberOfFilledCacheLines">HighestPredictedNumberOfFilledCacheLines</option>
              <option value="LowestPredictedNumberOfFilledCacheLines">LowestPredictedNumberOfFilledCacheLines</option>

              <option value="HighestSlope">HighestSlope</option>
              <option value="LowestSlope">LowestSlope</option>

              <option value="HighestScore">HighestScore</option>
              <option value="LowestScore">LowestScore</option>

              <option value="HighestRank">HighestRank</option>
              <option value="LowestRank">LowestRank</option>

              {/* Coverage types that require --KeysSubset */}
              <option value="HighestMaxAssignedPerCacheLineCountForKeysSubset">
                HighestMaxAssignedPerCacheLineCountForKeysSubset
              </option>
              <option value="LowestMaxAssignedPerCacheLineCountForKeysSubset">
                LowestMaxAssignedPerCacheLineCountForKeysSubset
              </option>

              <option value="HighestNumberOfCacheLinesUsedByKeysSubset">HighestNumberOfCacheLinesUsedByKeysSubset</option>
              <option value="LowestNumberOfCacheLinesUsedByKeysSubset">LowestNumberOfCacheLinesUsedByKeysSubset</option>

              <option value="HighestNumberOfLargePagesUsedByKeysSubset">HighestNumberOfLargePagesUsedByKeysSubset</option>
              <option value="LowestNumberOfLargePagesUsedByKeysSubset">LowestNumberOfLargePagesUsedByKeysSubset</option>

              <option value="HighestNumberOfPagesUsedByKeysSubset">HighestNumberOfPagesUsedByKeysSubset</option>
              <option value="LowestNumberOfPagesUsedByKeysSubset">LowestNumberOfPagesUsedByKeysSubset</option>
            </select>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Indicates the predicate to determine what constitutes the best graph. <br />
              <strong>Note:</strong> Coverage types with "ForKeysSubset" require the <code>--KeysSubset</code> flag.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="maxNumberOfEqualBestGraphs">Max Number of Equal Best Graphs</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="maxNumberOfEqualBestGraphs"
              value={maxNumberOfEqualBestGraphs}
              onChange={(e) => setMaxNumberOfEqualBestGraphs(parseInt(e.target.value))}
              min="1"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Specifies the number of times an "equal" best graph is encountered before
              stopping further solving attempts.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="minNumberOfKeysForFindBestGraph">Min Number of Keys for Find Best Graph</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="minNumberOfKeysForFindBestGraph"
              value={minNumberOfKeysForFindBestGraph}
              onChange={(e) => setMinNumberOfKeysForFindBestGraph(parseInt(e.target.value))}
              min="1"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Specifies the minimum number of keys required before "find best graph" mode
              is honored. Defaults to 512.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="bestCoverageTargetValue">Best Coverage Target Value</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="bestCoverageTargetValue"
              value={bestCoverageTargetValue || ""}
              onChange={(e) => setBestCoverageTargetValue(e.target.value ? parseFloat(e.target.value) : null)}
              style={{ width: "100%" }}
              step="0.01"
              placeholder="Enter a target value"
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Specifies a target value for the best coverage type. Solving will stop
              once a solution meets this target. Use appropriate values for integer or
              floating-point based coverage types.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="keysSubset">Keys Subset</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="text"
              id="keysSubset"
              value={keysSubset}
              onChange={(e) => setKeysSubset(e.target.value)}
              placeholder="e.g., 10,50,123,600,670"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Supplies a comma-separated list of keys in ascending key-value order. Must contain two or more elements.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="targetNumberOfSolutions">Target Number of Solutions</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="targetNumberOfSolutions"
              value={targetNumberOfSolutions}
              onChange={(e) => setTargetNumberOfSolutions(parseInt(e.target.value))}
              min="1"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Specifies the target number of solutions to find before stopping graph solving. Useful for benchmarking.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="fixedAttempts">Fixed Attempts</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="fixedAttempts"
              value={fixedAttempts}
              onChange={(e) => setFixedAttempts(parseInt(e.target.value))}
              min="1"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Specifies a fixed number of attempts before stopping, regardless of whether a solution was found. Useful for benchmarking.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="seeds">Seeds</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="text"
              id="seeds"
              value={seeds}
              onChange={(e) => setSeeds(e.target.value)}
              placeholder="e.g., 0,0,0x1000"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies an optional comma-separated list of up to 8 integers that represent the seed values
              to use for every graph solving attempt. Each value may be zero, which tells the algorithm
              to use a random seed for this position as per normal.<br /><br />

              The logic is also cognizant of the hash function's seed masks, e.g., MultiplyShiftR has a seed
              mask of <code>0x1f1f</code> for seed 3 (which is used to control the final right shift amount), so,
              if we use the following:<br /><br />

              <code>--Seeds=0,0,0x1000</code><br /><br />

              It will use random bytes for the first two seeds. For the second byte of the third seed, it'll
              use <code>0x10</code> (as 4096 is <code>0x1000</code>), but will use a random byte for the
              first byte. (If we were to use <code>--Seeds=0,0,16</code>, then the first byte will be locked
              to <code>0x10</code> and the second byte will be random.)<br /><br />

              This has proven useful for the hash function MultiplyShiftR when using
              <code>--InitialNumberOfTableResizes=1 --Seeds=0,0,0x1010</code> as it forces all vertices to
              be constrained to the first half of the assigned array (thus negating the overhead of a table
              resize). It may be useful in other contexts, too.<br /><br />

              <strong>Note:</strong> Either hex or decimal can be used for the seed values.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="seed3Byte1MaskCounts">Seed3 Byte 1 Mask Counts</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="text"
              id="seed3Byte1MaskCounts"
              value={seed3Byte1MaskCounts}
              onChange={(e) => setSeed3Byte1MaskCounts(e.target.value)}
              placeholder="32 comma-separated integers"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Comma-separated list of 32 integers representing weighted counts of seed mask byte values.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="seed3Byte2MaskCounts">Seed3 Byte 2 Mask Counts</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="text"
              id="seed3Byte2MaskCounts"
              value={seed3Byte2MaskCounts}
              onChange={(e) => setSeed3Byte2MaskCounts(e.target.value)}
              placeholder="32 comma-separated integers"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Comma-separated list of 32 integers representing weighted counts of seed mask byte values.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="solutionsFoundRatio">Solutions Found Ratio</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="solutionsFoundRatio"
              value={solutionsFoundRatio || ""}
              onChange={(e) => setSolutionsFoundRatio(e.target.value ? parseFloat(e.target.value) : null)}
              step="0.01"
              placeholder="Enter a double value"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies a double (64-bit) floating-point number indicating the ratio of solutions found
              (obtained from a prior run). This ratio is used to calculate the predicted number of
              attempts required to solve a given graph. When combined with
              <code>--TryUsePredictedAttemptsToLimitMaxConcurrency</code>, the maximum concurrency
              used when solving will be the minimum of the predicted attempts and the maximum
              concurrency indicated on the command line.<br /><br />

              <strong>Note:</strong> These parameters are typically less useful for bulk-create options
              as each table will have different solving characteristics.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="rng">Random Number Generator (RNG)</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <select
              id="rng"
              value={rng}
              onChange={(e) => setRng(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="Philox43210">Philox43210</option>
              <option value="System">System</option>
            </select>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies the name of a random number generator to use for obtaining the random bytes needed
              as part of graph solving. Valid values:<br /><br />

              <strong>Philox43210</strong><br />
              Uses the Philox 4x32 10-round pseudo-RNG. This is the default. This should be used when
              benchmarking creation performance, as it ensures the random numbers fed to each graph
              solving attempt are identical between runs, resulting in consistent runtimes across
              subsequent runs. It may result in slower solving times versus the System RNG, depending
              on your key set.<br /><br />

              <strong>System</strong><br />
              Uses the standard operating system facilities for obtaining random data. All other
              <code>--Rng*</code> parameters are ignored. This should be used when attempting to find
              legitimate solutions; however, due to the inherent randomness, it will result in varying
              runtimes across subsequent runs.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="rngSeed">RNG Seed</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="text"
              id="rngSeed"
              value={rngSeed}
              onChange={(e) => setRngSeed(e.target.value)}
              placeholder="e.g., 0x2019090319811025"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies a 64-bit seed used to initialize the RNG. Defaults to <code>0x2019090319811025</code>,
              unless <code>--RngUseRandomStartSeed</code> is supplied, in which case a random seed is obtained from the OS.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="rngSubsequence">RNG Subsequence</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="rngSubsequence"
              value={rngSubsequence}
              onChange={(e) => setRngSubsequence(parseInt(e.target.value))}
              min="0"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies the initial subsequence used by the RNG. The first graph will
              use this sequence, with each additional graph adding 1 to this value.
              Defaults to 0.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="rngOffset">RNG Offset</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="rngOffset"
              value={rngOffset}
              onChange={(e) => setRngOffset(parseInt(e.target.value))}
              min="0"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Supplies the initial offset used by the RNG. Defaults to 0.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="remark">Remark</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="text"
              id="remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Additional description about run"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies a remark associated with the run for inclusion in the .csv output files.
              An error will occur if the provided string contains commas, as this would break
              the .csv output.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="maxSolveTimeInSeconds">Max Solve Time in Seconds</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="maxSolveTimeInSeconds"
              value={maxSolveTimeInSeconds || ""}
              onChange={(e) => setMaxSolveTimeInSeconds(e.target.value ? parseInt(e.target.value) : null)}
              min="0"
              placeholder="Enter seconds"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>Supplies the maximum number of seconds to try and solve an individual graph.</span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="functionHookCallbackDllPath">Function Hook Callback DLL Path</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="text"
              id="functionHookCallbackDllPath"
              value={functionHookCallbackDllPath}
              onChange={(e) => setFunctionHookCallbackDllPath(e.target.value)}
              placeholder="Path to .dll file"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies a fully-qualified path to a .dll file that will be used as the
              callback handler for hooked functions.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="functionHookCallbackFunctionName">Function Hook Callback Function Name</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="text"
              id="functionHookCallbackFunctionName"
              value={functionHookCallbackFunctionName}
              onChange={(e) => setFunctionHookCallbackFunctionName(e.target.value)}
              placeholder="e.g., InterlockedIncrement"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies the exported function name to resolve from the callback module (above)
              and use as the callback for hooked functions. The default is InterlockedIncrement.
            </span>
          </div>
        </div>

        <div style={{ display: "table-row", border: "2px solid gray", padding: "10px" }}>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <label htmlFor="functionHookCallbackIgnoreRip">Function Hook Callback Ignore RIP</label>
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray" }}>
            <input
              type="number"
              id="functionHookCallbackIgnoreRip"
              value={functionHookCallbackIgnoreRip || ""}
              onChange={(e) => setFunctionHookCallbackIgnoreRip(e.target.value ? parseInt(e.target.value) : null)}
              min="0"
              placeholder="Enter a relative RIP"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "table-cell", padding: "10px", border: "2px solid gray", verticalAlign: "top" }}>
            <span>
              Supplies a relative RIP to ignore during function callback. If a caller matches
              the supplied relative RIP, the function callback will not be executed.
            </span>
          </div>
        </div>


      </div>

      {/* Generated Command Display */}
      <div style={{ marginTop: "20px" }}>
        <label>Generated Command:</label>
        <textarea
          readOnly
          value={command}
          style={{ width: "100%", height: "100px", marginTop: "10px" }}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(command);
          }}
          style={{ marginTop: "10px", padding: "5px 10px" }}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default PerfectHashForm;
