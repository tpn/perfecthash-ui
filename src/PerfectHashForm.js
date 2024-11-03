import React, { useState } from "react";

const PerfectHashForm = () => {
  const [keysPath, setKeysPath] = useState("c:\\src\\perfecthash-keys\\sys32\\HolgramWorld-31016.keys");
  const [outputDirectory, setOutputDirectory] = useState("c:\\Temp\\ph.out");
  const [algorithm, setAlgorithm] = useState("Chm01");
  const [hashFunction, setHashFunction] = useState("Jenkins");
  const [maskFunction, setMaskFunction] = useState("And");
  const [maxConcurrency, setMaxConcurrency] = useState("0");
  const [skipTestAfterCreate, setSkipTestAfterCreate] = useState(false);
  const [compile, setCompile] = useState(false);
  const [tryLargePagesForKeysData, setTryLargePagesForKeysData] = useState(false);
  const [skipKeysVerification, setSkipKeysVerification] = useState(false);
  const [disableImplicitKeyDownsizing, setDisableImplicitKeyDownsizing] = useState(false);
  const [tryInferKeySizeFromKeysFilename, setTryInferKeySizeFromKeysFilename] = useState(false);

  const [silent, setSilent] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [noFileIo, setNoFileIo] = useState(false);
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
const [findBestGraph, setFindBestGraph] = useState(false);


    // Table Create Parameters
const [graphImpl, setGraphImpl] = useState(3); // default: 3
const [valueSizeInBytes, setValueSizeInBytes] = useState(4); // default: 4
const [mainWorkThreadpoolPriority, setMainWorkThreadpoolPriority] = useState("Normal"); // default: Normal
const [fileWorkThreadpoolPriority, setFileWorkThreadpoolPriority] = useState("Normal"); // default: Normal
const [attemptsBeforeTableResize, setAttemptsBeforeTableResize] = useState(4294967295); // default: 4,294,967,295
const [maxNumberOfTableResizes, setMaxNumberOfTableResizes] = useState(5); // default: 5
const [initialNumberOfTableResizes, setInitialNumberOfTableResizes] = useState(0); // default: 0
const [autoResizeWhenKeysToEdgesRatioExceeds, setAutoResizeWhenKeysToEdgesRatioExceeds] = useState(0.0); // no default specified; requires 0.0 < D < 1.0
const [bestCoverageAttempts, setBestCoverageAttempts] = useState(1); // positive integer, no default specified
const [bestCoverageType, setBestCoverageType] = useState("HighestScore"); // default: none
const [maxNumberOfEqualBestGraphs, setMaxNumberOfEqualBestGraphs] = useState(1); // positive integer
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
// State variables for the final Table Create Parameters
const [rngSeed, setRngSeed] = useState("0x2019090319811025"); // default seed in hex
const [rngSubsequence, setRngSubsequence] = useState(0); // default: 0
const [rngOffset, setRngOffset] = useState(0); // default: 0
const [maxSolveTimeInSeconds, setMaxSolveTimeInSeconds] = useState(null); // for integer seconds
const [functionHookCallbackDllPath, setFunctionHookCallbackDllPath] = useState(""); // path to DLL
const [functionHookCallbackFunctionName, setFunctionHookCallbackFunctionName] = useState("InterlockedIncrement"); // default function name
const [functionHookCallbackIgnoreRip, setFunctionHookCallbackIgnoreRip] = useState(null); // integer RIP
const [remark, setRemark] = useState(""); // remark string

    const command = `PerfectHashCreate.exe ${keysPath} ${outputDirectory} ${algorithm} ${hashFunction} ${maskFunction} ${maxConcurrency}` +
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

  return (
    <div style={{ minWidth: "600px", maxWidth:"1800px", margin: "auto", padding: "20px" }}>
      <h2>PerfectHashCreate Command Generator</h2>

      <div>
        <label>Keys Path:</label>
        <input
          type="text"
          value={keysPath}
          onChange={(e) => setKeysPath(e.target.value)}
          placeholder="Enter keys file path"
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>

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
          <option value="Jenkins">Jenkins</option>
          <option value="MultiplyShiftR">MultiplyShiftR</option>
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

  {/* Row 1: Skip Test After Create */}
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

  {/* Row 2: Compile */}
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

  {/* Row 1: Try Large Pages For Keys Data */}
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

  {/* Row 2: Skip Keys Verification */}
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

  {/* Row 3: Disable Implicit Key Downsizing */}
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

  {/* Row 4: Try Infer Key Size From Keys Filename */}
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

{/* Row for Find Best Graph */}
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


  {/* Row 1: Silent */}
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

  {/* Row 2: Quiet */}
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

  {/* Row 3: No File I/O */}
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

  {/* Row 4: Paranoid */}
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

  {/* Row 5: Use/Do Not Use RWS Section for Table Values */}
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

  {/* Row 6: Skip Graph Verification */}
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

  {/* Row 7: Hash All Keys First */}
  <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
    <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
      <div>
        <input
          type="radio"
          id="hashAllKeysFirst"
          name="hashKeys"
          value="hashAll"
          checked={hashAllKeysFirst}
          onChange={() => setHashAllKeysFirst(true)}
        />
        <label htmlFor="hashAllKeysFirst" style={{ marginLeft: "8px" }}>Hash All Keys First</label>
      </div>
      <div style={{ marginTop: "8px" }}>
        <input
          type="radio"
          id="doNotHashAllKeysFirst"
          name="hashKeys"
          value="doNotHashAll"
          checked={!hashAllKeysFirst}
          onChange={() => setHashAllKeysFirst(false)}
        />
        <label htmlFor="doNotHashAllKeysFirst" style={{ marginLeft: "8px" }}>Do Not Hash All Keys First</label>
      </div>
    </div>
    <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
      <span>Determines if keys are hashed up-front before constructing the graph.</span>
    </div>
  </div>

  {/* Additional rows as necessary, following the same format for other flags */}
  {/* Row 1: Enable Write Combine For Vertex Pairs */}
  <div style={{ display: "table-row", border: "2px solid red", padding: "10px" }}>
    <div style={{ display: "table-cell", padding: "10px", border: "2px solid red" }}>
      <input
        type="checkbox"
        checked={enableWriteCombineForVertexPairs}
        onChange={(e) => setEnableWriteCombineForVertexPairs(e.target.checked)}
        id="enableWriteCombineForVertexPairs"
      />
      <label htmlFor="enableWriteCombineForVertexPairs" style={{ marginLeft: "8px" }}>
        Enable Write Combine For Vertex Pairs
      </label>
    </div>
    <div style={{ display: "table-cell", padding: "10px", border: "2px solid red", verticalAlign: "top" }}>
      <span>
        Allocates memory for the vertex pairs array with write-combine page protection. <br />
        <strong>Note:</strong> Only applies when <code>--HashAllKeysFirst</code> is set.
        Incompatible with <code>--TryLargePagesForVertexPairs</code>.
      </span>
    </div>
  </div>

{/* Row for Try Use Predicted Attempts to Limit Max Concurrency */}
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

  {/* Row 2: Remove Write Combine After Successful Hash Keys */}
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

  {/* Row 3: Try Large Pages For Vertex Pairs */}
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

  {/* Row 4: Try Large Pages For Graph Edge And Vertex Arrays */}
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

  {/* Row 5: Try Large Pages For Graph Table Data */}
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

  {/* Row 6: Use Previous Table Size */}
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

  {/* Row 1: Include Number Of Table Resize Events In Output Path */}
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

  {/* Row 2: Include Number Of Table Elements In Output Path */}
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

  {/* Row 3: RNG Use Random Start Seed */}
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

  {/* Row 4: Try Use AVX2 Hash Function */}
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

  {/* Row 1: Try Use AVX512 Hash Function */}
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

  {/* Row 2: Do Not Try Use AVX2 Memory Coverage Function */}
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

  {/* Row 3: Include Keys In Compiled DLL */}
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

  {/* Row 4: Disable Saving Callback Table Values */}
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

  {/* Row 5: Do Not Try Use Hash16 Impl */}
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

  {/* Row 1: Graph Implementation */}
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

  {/* Row 2: Value Size In Bytes */}
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

  {/* Row 3: Main Work Threadpool Priority */}
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

  {/* Row 4: File Work Threadpool Priority */}
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

  {/* Row 5: Attempts Before Table Resize */}
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

  {/* Row 6: Max Number of Table Resizes */}
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

  {/* Row 7: Initial Number of Table Resizes */}
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

  {/* Row 8: Auto Resize When Keys to Edges Ratio Exceeds */}
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

  {/* Row 9: Best Coverage Attempts */}
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

{/* Row for Best Coverage Type */}
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

    {/* Row for Max Number of Equal Best Graphs */}
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

{/* Row for Min Number of Keys for Find Best Graph */}
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

{/* Row for Best Coverage Target Value */}
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

{/* Row for Keys Subset */}
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

{/* Row for Target Number of Solutions */}
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

{/* Row for Fixed Attempts */}
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

{/* Row for Seeds */}
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

{/* Row for Seed3 Byte 1 Mask Counts */}
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

{/* Row for Seed3 Byte 2 Mask Counts */}
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

    {/* Row for Solutions Found Ratio */}
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

{/* Row for RNG */}
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

{/* Row for RNG Seed */}
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

{/* Row for RNG Subsequence */}
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

{/* Row for RNG Offset */}
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

{/* Row for Remark */}
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

{/* Row for Max Solve Time in Seconds */}
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

{/* Row for Function Hook Callback DLL Path */}
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

{/* Row for Function Hook Callback Function Name */}
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

{/* Row for Function Hook Callback Ignore RIP */}
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
      </div>
    </div>
  );
};

export default PerfectHashForm;

