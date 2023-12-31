import { ATN } from 'antlr4ts/atn/ATN';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { Python3Listener } from './python3-listener';
import { Python3Visitor } from './python3-visitor';
export declare class Python3Parser extends Parser {
    static readonly STRING = 1;
    static readonly NUMBER = 2;
    static readonly INTEGER = 3;
    static readonly DEF = 4;
    static readonly RETURN = 5;
    static readonly RAISE = 6;
    static readonly FROM = 7;
    static readonly IMPORT = 8;
    static readonly AS = 9;
    static readonly GLOBAL = 10;
    static readonly NONLOCAL = 11;
    static readonly ASSERT = 12;
    static readonly IF = 13;
    static readonly ELIF = 14;
    static readonly ELSE = 15;
    static readonly WHILE = 16;
    static readonly FOR = 17;
    static readonly IN = 18;
    static readonly TRY = 19;
    static readonly FINALLY = 20;
    static readonly WITH = 21;
    static readonly EXCEPT = 22;
    static readonly LAMBDA = 23;
    static readonly OR = 24;
    static readonly AND = 25;
    static readonly NOT = 26;
    static readonly IS = 27;
    static readonly NONE = 28;
    static readonly TRUE = 29;
    static readonly FALSE = 30;
    static readonly CLASS = 31;
    static readonly YIELD = 32;
    static readonly DEL = 33;
    static readonly PASS = 34;
    static readonly CONTINUE = 35;
    static readonly BREAK = 36;
    static readonly ASYNC = 37;
    static readonly AWAIT = 38;
    static readonly NEWLINE = 39;
    static readonly NAME = 40;
    static readonly STRING_LITERAL = 41;
    static readonly BYTES_LITERAL = 42;
    static readonly DECIMAL_INTEGER = 43;
    static readonly OCT_INTEGER = 44;
    static readonly HEX_INTEGER = 45;
    static readonly BIN_INTEGER = 46;
    static readonly FLOAT_NUMBER = 47;
    static readonly IMAG_NUMBER = 48;
    static readonly DOT = 49;
    static readonly ELLIPSIS = 50;
    static readonly STAR = 51;
    static readonly OPEN_PAREN = 52;
    static readonly CLOSE_PAREN = 53;
    static readonly COMMA = 54;
    static readonly COLON = 55;
    static readonly SEMI_COLON = 56;
    static readonly POWER = 57;
    static readonly ASSIGN = 58;
    static readonly OPEN_BRACK = 59;
    static readonly CLOSE_BRACK = 60;
    static readonly OR_OP = 61;
    static readonly XOR = 62;
    static readonly AND_OP = 63;
    static readonly LEFT_SHIFT = 64;
    static readonly RIGHT_SHIFT = 65;
    static readonly ADD = 66;
    static readonly MINUS = 67;
    static readonly DIV = 68;
    static readonly MOD = 69;
    static readonly IDIV = 70;
    static readonly NOT_OP = 71;
    static readonly OPEN_BRACE = 72;
    static readonly CLOSE_BRACE = 73;
    static readonly LESS_THAN = 74;
    static readonly GREATER_THAN = 75;
    static readonly EQUALS = 76;
    static readonly GT_EQ = 77;
    static readonly LT_EQ = 78;
    static readonly NOT_EQ_1 = 79;
    static readonly NOT_EQ_2 = 80;
    static readonly AT = 81;
    static readonly ARROW = 82;
    static readonly ADD_ASSIGN = 83;
    static readonly SUB_ASSIGN = 84;
    static readonly MULT_ASSIGN = 85;
    static readonly AT_ASSIGN = 86;
    static readonly DIV_ASSIGN = 87;
    static readonly MOD_ASSIGN = 88;
    static readonly AND_ASSIGN = 89;
    static readonly OR_ASSIGN = 90;
    static readonly XOR_ASSIGN = 91;
    static readonly LEFT_SHIFT_ASSIGN = 92;
    static readonly RIGHT_SHIFT_ASSIGN = 93;
    static readonly POWER_ASSIGN = 94;
    static readonly IDIV_ASSIGN = 95;
    static readonly SKIP_ = 96;
    static readonly UNKNOWN_CHAR = 97;
    static readonly INDENT = 98;
    static readonly DEDENT = 99;
    static readonly RULE_single_input = 0;
    static readonly RULE_file_input = 1;
    static readonly RULE_eval_input = 2;
    static readonly RULE_decorator = 3;
    static readonly RULE_decorators = 4;
    static readonly RULE_decorated = 5;
    static readonly RULE_async_funcdef = 6;
    static readonly RULE_funcdef = 7;
    static readonly RULE_parameters = 8;
    static readonly RULE_typedargslist = 9;
    static readonly RULE_tfpdef = 10;
    static readonly RULE_varargslist = 11;
    static readonly RULE_vfpdef = 12;
    static readonly RULE_stmt = 13;
    static readonly RULE_simple_stmt = 14;
    static readonly RULE_small_stmt = 15;
    static readonly RULE_expr_stmt = 16;
    static readonly RULE_simple_assign = 17;
    static readonly RULE_annassign = 18;
    static readonly RULE_testlist_star_expr = 19;
    static readonly RULE_augassign = 20;
    static readonly RULE_del_stmt = 21;
    static readonly RULE_pass_stmt = 22;
    static readonly RULE_flow_stmt = 23;
    static readonly RULE_break_stmt = 24;
    static readonly RULE_continue_stmt = 25;
    static readonly RULE_return_stmt = 26;
    static readonly RULE_yield_stmt = 27;
    static readonly RULE_raise_stmt = 28;
    static readonly RULE_import_stmt = 29;
    static readonly RULE_import_name = 30;
    static readonly RULE_import_from = 31;
    static readonly RULE_import_as_name = 32;
    static readonly RULE_dotted_as_name = 33;
    static readonly RULE_import_as_names = 34;
    static readonly RULE_dotted_as_names = 35;
    static readonly RULE_dotted_name = 36;
    static readonly RULE_global_stmt = 37;
    static readonly RULE_nonlocal_stmt = 38;
    static readonly RULE_assert_stmt = 39;
    static readonly RULE_compound_stmt = 40;
    static readonly RULE_async_stmt = 41;
    static readonly RULE_if_stmt = 42;
    static readonly RULE_while_stmt = 43;
    static readonly RULE_for_stmt = 44;
    static readonly RULE_try_stmt = 45;
    static readonly RULE_with_stmt = 46;
    static readonly RULE_with_item = 47;
    static readonly RULE_except_clause = 48;
    static readonly RULE_suite = 49;
    static readonly RULE_test = 50;
    static readonly RULE_test_nocond = 51;
    static readonly RULE_lambdef = 52;
    static readonly RULE_lambdef_nocond = 53;
    static readonly RULE_or_test = 54;
    static readonly RULE_and_test = 55;
    static readonly RULE_not_test = 56;
    static readonly RULE_comparison = 57;
    static readonly RULE_comp_op = 58;
    static readonly RULE_star_expr = 59;
    static readonly RULE_expr = 60;
    static readonly RULE_xor_expr = 61;
    static readonly RULE_and_expr = 62;
    static readonly RULE_shift_expr = 63;
    static readonly RULE_arith_expr = 64;
    static readonly RULE_term = 65;
    static readonly RULE_factor = 66;
    static readonly RULE_power = 67;
    static readonly RULE_atom_expr = 68;
    static readonly RULE_atom = 69;
    static readonly RULE_testlist_comp = 70;
    static readonly RULE_trailer = 71;
    static readonly RULE_subscriptlist = 72;
    static readonly RULE_subscript = 73;
    static readonly RULE_sliceop = 74;
    static readonly RULE_exprlist = 75;
    static readonly RULE_testlist = 76;
    static readonly RULE_dictorsetmaker = 77;
    static readonly RULE_classdef = 78;
    static readonly RULE_arglist = 79;
    static readonly RULE_argument = 80;
    static readonly RULE_comp_iter = 81;
    static readonly RULE_comp_for = 82;
    static readonly RULE_comp_if = 83;
    static readonly RULE_encoding_decl = 84;
    static readonly RULE_yield_expr = 85;
    static readonly RULE_yield_arg = 86;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    get vocabulary(): Vocabulary;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException;
    constructor(input: TokenStream);
    single_input(): Single_inputContext;
    file_input(): File_inputContext;
    eval_input(): Eval_inputContext;
    decorator(): DecoratorContext;
    decorators(): DecoratorsContext;
    decorated(): DecoratedContext;
    async_funcdef(): Async_funcdefContext;
    funcdef(): FuncdefContext;
    parameters(): ParametersContext;
    typedargslist(): TypedargslistContext;
    tfpdef(): TfpdefContext;
    varargslist(): VarargslistContext;
    vfpdef(): VfpdefContext;
    stmt(): StmtContext;
    simple_stmt(): Simple_stmtContext;
    small_stmt(): Small_stmtContext;
    expr_stmt(): Expr_stmtContext;
    simple_assign(): Simple_assignContext;
    annassign(): AnnassignContext;
    testlist_star_expr(): Testlist_star_exprContext;
    augassign(): AugassignContext;
    del_stmt(): Del_stmtContext;
    pass_stmt(): Pass_stmtContext;
    flow_stmt(): Flow_stmtContext;
    break_stmt(): Break_stmtContext;
    continue_stmt(): Continue_stmtContext;
    return_stmt(): Return_stmtContext;
    yield_stmt(): Yield_stmtContext;
    raise_stmt(): Raise_stmtContext;
    import_stmt(): Import_stmtContext;
    import_name(): Import_nameContext;
    import_from(): Import_fromContext;
    import_as_name(): Import_as_nameContext;
    dotted_as_name(): Dotted_as_nameContext;
    import_as_names(): Import_as_namesContext;
    dotted_as_names(): Dotted_as_namesContext;
    dotted_name(): Dotted_nameContext;
    global_stmt(): Global_stmtContext;
    nonlocal_stmt(): Nonlocal_stmtContext;
    assert_stmt(): Assert_stmtContext;
    compound_stmt(): Compound_stmtContext;
    async_stmt(): Async_stmtContext;
    if_stmt(): If_stmtContext;
    while_stmt(): While_stmtContext;
    for_stmt(): For_stmtContext;
    try_stmt(): Try_stmtContext;
    with_stmt(): With_stmtContext;
    with_item(): With_itemContext;
    except_clause(): Except_clauseContext;
    suite(): SuiteContext;
    test(): TestContext;
    test_nocond(): Test_nocondContext;
    lambdef(): LambdefContext;
    lambdef_nocond(): Lambdef_nocondContext;
    or_test(): Or_testContext;
    and_test(): And_testContext;
    not_test(): Not_testContext;
    comparison(): ComparisonContext;
    comp_op(): Comp_opContext;
    star_expr(): Star_exprContext;
    expr(): ExprContext;
    xor_expr(): Xor_exprContext;
    and_expr(): And_exprContext;
    shift_expr(): Shift_exprContext;
    arith_expr(): Arith_exprContext;
    term(): TermContext;
    factor(): FactorContext;
    power(): PowerContext;
    atom_expr(): Atom_exprContext;
    atom(): AtomContext;
    testlist_comp(): Testlist_compContext;
    trailer(): TrailerContext;
    subscriptlist(): SubscriptlistContext;
    subscript(): SubscriptContext;
    sliceop(): SliceopContext;
    exprlist(): ExprlistContext;
    testlist(): TestlistContext;
    dictorsetmaker(): DictorsetmakerContext;
    classdef(): ClassdefContext;
    arglist(): ArglistContext;
    argument(): ArgumentContext;
    comp_iter(): Comp_iterContext;
    comp_for(): Comp_forContext;
    comp_if(): Comp_ifContext;
    encoding_decl(): Encoding_declContext;
    yield_expr(): Yield_exprContext;
    yield_arg(): Yield_argContext;
    private static readonly _serializedATNSegments;
    private static readonly _serializedATNSegment0;
    private static readonly _serializedATNSegment1;
    private static readonly _serializedATNSegment2;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}
export declare class Single_inputContext extends ParserRuleContext {
    NEWLINE(): TerminalNode | undefined;
    simple_stmt(): Simple_stmtContext | undefined;
    compound_stmt(): Compound_stmtContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class File_inputContext extends ParserRuleContext {
    EOF(): TerminalNode;
    NEWLINE(): TerminalNode[];
    NEWLINE(i: number): TerminalNode;
    stmt(): StmtContext[];
    stmt(i: number): StmtContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Eval_inputContext extends ParserRuleContext {
    testlist(): TestlistContext;
    EOF(): TerminalNode;
    NEWLINE(): TerminalNode[];
    NEWLINE(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class DecoratorContext extends ParserRuleContext {
    AT(): TerminalNode;
    dotted_name(): Dotted_nameContext;
    NEWLINE(): TerminalNode;
    OPEN_PAREN(): TerminalNode | undefined;
    CLOSE_PAREN(): TerminalNode | undefined;
    arglist(): ArglistContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class DecoratorsContext extends ParserRuleContext {
    decorator(): DecoratorContext[];
    decorator(i: number): DecoratorContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class DecoratedContext extends ParserRuleContext {
    decorators(): DecoratorsContext;
    classdef(): ClassdefContext | undefined;
    funcdef(): FuncdefContext | undefined;
    async_funcdef(): Async_funcdefContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Async_funcdefContext extends ParserRuleContext {
    ASYNC(): TerminalNode;
    funcdef(): FuncdefContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class FuncdefContext extends ParserRuleContext {
    DEF(): TerminalNode;
    NAME(): TerminalNode;
    parameters(): ParametersContext;
    COLON(): TerminalNode;
    suite(): SuiteContext;
    ARROW(): TerminalNode | undefined;
    test(): TestContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class ParametersContext extends ParserRuleContext {
    OPEN_PAREN(): TerminalNode;
    CLOSE_PAREN(): TerminalNode;
    typedargslist(): TypedargslistContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class TypedargslistContext extends ParserRuleContext {
    tfpdef(): TfpdefContext[];
    tfpdef(i: number): TfpdefContext;
    STAR(): TerminalNode | undefined;
    POWER(): TerminalNode | undefined;
    ASSIGN(): TerminalNode[];
    ASSIGN(i: number): TerminalNode;
    test(): TestContext[];
    test(i: number): TestContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class TfpdefContext extends ParserRuleContext {
    NAME(): TerminalNode;
    COLON(): TerminalNode | undefined;
    test(): TestContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class VarargslistContext extends ParserRuleContext {
    vfpdef(): VfpdefContext[];
    vfpdef(i: number): VfpdefContext;
    STAR(): TerminalNode | undefined;
    POWER(): TerminalNode | undefined;
    ASSIGN(): TerminalNode[];
    ASSIGN(i: number): TerminalNode;
    test(): TestContext[];
    test(i: number): TestContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class VfpdefContext extends ParserRuleContext {
    NAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class StmtContext extends ParserRuleContext {
    simple_stmt(): Simple_stmtContext | undefined;
    compound_stmt(): Compound_stmtContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Simple_stmtContext extends ParserRuleContext {
    small_stmt(): Small_stmtContext[];
    small_stmt(i: number): Small_stmtContext;
    NEWLINE(): TerminalNode;
    SEMI_COLON(): TerminalNode[];
    SEMI_COLON(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Small_stmtContext extends ParserRuleContext {
    expr_stmt(): Expr_stmtContext | undefined;
    del_stmt(): Del_stmtContext | undefined;
    pass_stmt(): Pass_stmtContext | undefined;
    flow_stmt(): Flow_stmtContext | undefined;
    import_stmt(): Import_stmtContext | undefined;
    global_stmt(): Global_stmtContext | undefined;
    nonlocal_stmt(): Nonlocal_stmtContext | undefined;
    assert_stmt(): Assert_stmtContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Expr_stmtContext extends ParserRuleContext {
    testlist_star_expr(): Testlist_star_exprContext;
    annassign(): AnnassignContext | undefined;
    augassign(): AugassignContext | undefined;
    simple_assign(): Simple_assignContext | undefined;
    yield_expr(): Yield_exprContext | undefined;
    testlist(): TestlistContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Simple_assignContext extends ParserRuleContext {
    ASSIGN(): TerminalNode[];
    ASSIGN(i: number): TerminalNode;
    yield_expr(): Yield_exprContext[];
    yield_expr(i: number): Yield_exprContext;
    testlist_star_expr(): Testlist_star_exprContext[];
    testlist_star_expr(i: number): Testlist_star_exprContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class AnnassignContext extends ParserRuleContext {
    COLON(): TerminalNode;
    test(): TestContext[];
    test(i: number): TestContext;
    ASSIGN(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Testlist_star_exprContext extends ParserRuleContext {
    test(): TestContext[];
    test(i: number): TestContext;
    star_expr(): Star_exprContext[];
    star_expr(i: number): Star_exprContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class AugassignContext extends ParserRuleContext {
    ADD_ASSIGN(): TerminalNode | undefined;
    SUB_ASSIGN(): TerminalNode | undefined;
    MULT_ASSIGN(): TerminalNode | undefined;
    AT_ASSIGN(): TerminalNode | undefined;
    DIV_ASSIGN(): TerminalNode | undefined;
    MOD_ASSIGN(): TerminalNode | undefined;
    AND_ASSIGN(): TerminalNode | undefined;
    OR_ASSIGN(): TerminalNode | undefined;
    XOR_ASSIGN(): TerminalNode | undefined;
    LEFT_SHIFT_ASSIGN(): TerminalNode | undefined;
    RIGHT_SHIFT_ASSIGN(): TerminalNode | undefined;
    POWER_ASSIGN(): TerminalNode | undefined;
    IDIV_ASSIGN(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Del_stmtContext extends ParserRuleContext {
    DEL(): TerminalNode;
    exprlist(): ExprlistContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Pass_stmtContext extends ParserRuleContext {
    PASS(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Flow_stmtContext extends ParserRuleContext {
    break_stmt(): Break_stmtContext | undefined;
    continue_stmt(): Continue_stmtContext | undefined;
    return_stmt(): Return_stmtContext | undefined;
    raise_stmt(): Raise_stmtContext | undefined;
    yield_stmt(): Yield_stmtContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Break_stmtContext extends ParserRuleContext {
    BREAK(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Continue_stmtContext extends ParserRuleContext {
    CONTINUE(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Return_stmtContext extends ParserRuleContext {
    RETURN(): TerminalNode;
    testlist(): TestlistContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Yield_stmtContext extends ParserRuleContext {
    yield_expr(): Yield_exprContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Raise_stmtContext extends ParserRuleContext {
    RAISE(): TerminalNode;
    test(): TestContext[];
    test(i: number): TestContext;
    FROM(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Import_stmtContext extends ParserRuleContext {
    import_name(): Import_nameContext | undefined;
    import_from(): Import_fromContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Import_nameContext extends ParserRuleContext {
    IMPORT(): TerminalNode;
    dotted_as_names(): Dotted_as_namesContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Import_fromContext extends ParserRuleContext {
    FROM(): TerminalNode | undefined;
    IMPORT(): TerminalNode | undefined;
    dotted_name(): Dotted_nameContext | undefined;
    STAR(): TerminalNode | undefined;
    OPEN_PAREN(): TerminalNode | undefined;
    import_as_names(): Import_as_namesContext | undefined;
    CLOSE_PAREN(): TerminalNode | undefined;
    DOT(): TerminalNode[];
    DOT(i: number): TerminalNode;
    ELLIPSIS(): TerminalNode[];
    ELLIPSIS(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Import_as_nameContext extends ParserRuleContext {
    NAME(): TerminalNode[];
    NAME(i: number): TerminalNode;
    AS(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Dotted_as_nameContext extends ParserRuleContext {
    dotted_name(): Dotted_nameContext;
    AS(): TerminalNode | undefined;
    NAME(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Import_as_namesContext extends ParserRuleContext {
    import_as_name(): Import_as_nameContext[];
    import_as_name(i: number): Import_as_nameContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Dotted_as_namesContext extends ParserRuleContext {
    dotted_as_name(): Dotted_as_nameContext[];
    dotted_as_name(i: number): Dotted_as_nameContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Dotted_nameContext extends ParserRuleContext {
    NAME(): TerminalNode[];
    NAME(i: number): TerminalNode;
    DOT(): TerminalNode[];
    DOT(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Global_stmtContext extends ParserRuleContext {
    GLOBAL(): TerminalNode;
    NAME(): TerminalNode[];
    NAME(i: number): TerminalNode;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Nonlocal_stmtContext extends ParserRuleContext {
    NONLOCAL(): TerminalNode;
    NAME(): TerminalNode[];
    NAME(i: number): TerminalNode;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Assert_stmtContext extends ParserRuleContext {
    ASSERT(): TerminalNode;
    test(): TestContext[];
    test(i: number): TestContext;
    COMMA(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Compound_stmtContext extends ParserRuleContext {
    if_stmt(): If_stmtContext | undefined;
    while_stmt(): While_stmtContext | undefined;
    for_stmt(): For_stmtContext | undefined;
    try_stmt(): Try_stmtContext | undefined;
    with_stmt(): With_stmtContext | undefined;
    funcdef(): FuncdefContext | undefined;
    classdef(): ClassdefContext | undefined;
    decorated(): DecoratedContext | undefined;
    async_stmt(): Async_stmtContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Async_stmtContext extends ParserRuleContext {
    ASYNC(): TerminalNode;
    funcdef(): FuncdefContext | undefined;
    with_stmt(): With_stmtContext | undefined;
    for_stmt(): For_stmtContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class If_stmtContext extends ParserRuleContext {
    IF(): TerminalNode;
    test(): TestContext[];
    test(i: number): TestContext;
    COLON(): TerminalNode[];
    COLON(i: number): TerminalNode;
    suite(): SuiteContext[];
    suite(i: number): SuiteContext;
    ELIF(): TerminalNode[];
    ELIF(i: number): TerminalNode;
    ELSE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class While_stmtContext extends ParserRuleContext {
    WHILE(): TerminalNode;
    test(): TestContext;
    COLON(): TerminalNode[];
    COLON(i: number): TerminalNode;
    suite(): SuiteContext[];
    suite(i: number): SuiteContext;
    ELSE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class For_stmtContext extends ParserRuleContext {
    FOR(): TerminalNode;
    exprlist(): ExprlistContext;
    IN(): TerminalNode;
    testlist(): TestlistContext;
    COLON(): TerminalNode[];
    COLON(i: number): TerminalNode;
    suite(): SuiteContext[];
    suite(i: number): SuiteContext;
    ELSE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Try_stmtContext extends ParserRuleContext {
    TRY(): TerminalNode | undefined;
    COLON(): TerminalNode[];
    COLON(i: number): TerminalNode;
    suite(): SuiteContext[];
    suite(i: number): SuiteContext;
    FINALLY(): TerminalNode | undefined;
    except_clause(): Except_clauseContext[];
    except_clause(i: number): Except_clauseContext;
    ELSE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class With_stmtContext extends ParserRuleContext {
    WITH(): TerminalNode;
    with_item(): With_itemContext[];
    with_item(i: number): With_itemContext;
    COLON(): TerminalNode;
    suite(): SuiteContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class With_itemContext extends ParserRuleContext {
    test(): TestContext;
    AS(): TerminalNode | undefined;
    expr(): ExprContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Except_clauseContext extends ParserRuleContext {
    EXCEPT(): TerminalNode;
    test(): TestContext | undefined;
    AS(): TerminalNode | undefined;
    NAME(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class SuiteContext extends ParserRuleContext {
    simple_stmt(): Simple_stmtContext | undefined;
    NEWLINE(): TerminalNode | undefined;
    INDENT(): TerminalNode | undefined;
    DEDENT(): TerminalNode | undefined;
    stmt(): StmtContext[];
    stmt(i: number): StmtContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class TestContext extends ParserRuleContext {
    or_test(): Or_testContext[];
    or_test(i: number): Or_testContext;
    IF(): TerminalNode | undefined;
    ELSE(): TerminalNode | undefined;
    test(): TestContext | undefined;
    lambdef(): LambdefContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Test_nocondContext extends ParserRuleContext {
    or_test(): Or_testContext | undefined;
    lambdef_nocond(): Lambdef_nocondContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class LambdefContext extends ParserRuleContext {
    LAMBDA(): TerminalNode;
    COLON(): TerminalNode;
    test(): TestContext;
    varargslist(): VarargslistContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Lambdef_nocondContext extends ParserRuleContext {
    LAMBDA(): TerminalNode;
    COLON(): TerminalNode;
    test_nocond(): Test_nocondContext;
    varargslist(): VarargslistContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Or_testContext extends ParserRuleContext {
    and_test(): And_testContext[];
    and_test(i: number): And_testContext;
    OR(): TerminalNode[];
    OR(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class And_testContext extends ParserRuleContext {
    not_test(): Not_testContext[];
    not_test(i: number): Not_testContext;
    AND(): TerminalNode[];
    AND(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Not_testContext extends ParserRuleContext {
    NOT(): TerminalNode | undefined;
    not_test(): Not_testContext | undefined;
    comparison(): ComparisonContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class ComparisonContext extends ParserRuleContext {
    expr(): ExprContext[];
    expr(i: number): ExprContext;
    comp_op(): Comp_opContext[];
    comp_op(i: number): Comp_opContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Comp_opContext extends ParserRuleContext {
    LESS_THAN(): TerminalNode | undefined;
    GREATER_THAN(): TerminalNode | undefined;
    EQUALS(): TerminalNode | undefined;
    GT_EQ(): TerminalNode | undefined;
    LT_EQ(): TerminalNode | undefined;
    NOT_EQ_1(): TerminalNode | undefined;
    NOT_EQ_2(): TerminalNode | undefined;
    IN(): TerminalNode | undefined;
    NOT(): TerminalNode | undefined;
    IS(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Star_exprContext extends ParserRuleContext {
    STAR(): TerminalNode;
    expr(): ExprContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class ExprContext extends ParserRuleContext {
    xor_expr(): Xor_exprContext[];
    xor_expr(i: number): Xor_exprContext;
    OR_OP(): TerminalNode[];
    OR_OP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Xor_exprContext extends ParserRuleContext {
    and_expr(): And_exprContext[];
    and_expr(i: number): And_exprContext;
    XOR(): TerminalNode[];
    XOR(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class And_exprContext extends ParserRuleContext {
    shift_expr(): Shift_exprContext[];
    shift_expr(i: number): Shift_exprContext;
    AND_OP(): TerminalNode[];
    AND_OP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Shift_exprContext extends ParserRuleContext {
    arith_expr(): Arith_exprContext[];
    arith_expr(i: number): Arith_exprContext;
    LEFT_SHIFT(): TerminalNode[];
    LEFT_SHIFT(i: number): TerminalNode;
    RIGHT_SHIFT(): TerminalNode[];
    RIGHT_SHIFT(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Arith_exprContext extends ParserRuleContext {
    term(): TermContext[];
    term(i: number): TermContext;
    ADD(): TerminalNode[];
    ADD(i: number): TerminalNode;
    MINUS(): TerminalNode[];
    MINUS(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class TermContext extends ParserRuleContext {
    factor(): FactorContext[];
    factor(i: number): FactorContext;
    STAR(): TerminalNode[];
    STAR(i: number): TerminalNode;
    AT(): TerminalNode[];
    AT(i: number): TerminalNode;
    DIV(): TerminalNode[];
    DIV(i: number): TerminalNode;
    MOD(): TerminalNode[];
    MOD(i: number): TerminalNode;
    IDIV(): TerminalNode[];
    IDIV(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class FactorContext extends ParserRuleContext {
    factor(): FactorContext | undefined;
    ADD(): TerminalNode | undefined;
    MINUS(): TerminalNode | undefined;
    NOT_OP(): TerminalNode | undefined;
    power(): PowerContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class PowerContext extends ParserRuleContext {
    atom_expr(): Atom_exprContext;
    POWER(): TerminalNode | undefined;
    factor(): FactorContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Atom_exprContext extends ParserRuleContext {
    atom(): AtomContext;
    AWAIT(): TerminalNode | undefined;
    trailer(): TrailerContext[];
    trailer(i: number): TrailerContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class AtomContext extends ParserRuleContext {
    OPEN_PAREN(): TerminalNode | undefined;
    CLOSE_PAREN(): TerminalNode | undefined;
    OPEN_BRACK(): TerminalNode | undefined;
    CLOSE_BRACK(): TerminalNode | undefined;
    OPEN_BRACE(): TerminalNode | undefined;
    CLOSE_BRACE(): TerminalNode | undefined;
    NAME(): TerminalNode | undefined;
    NUMBER(): TerminalNode | undefined;
    ELLIPSIS(): TerminalNode | undefined;
    NONE(): TerminalNode | undefined;
    TRUE(): TerminalNode | undefined;
    FALSE(): TerminalNode | undefined;
    yield_expr(): Yield_exprContext | undefined;
    testlist_comp(): Testlist_compContext | undefined;
    dictorsetmaker(): DictorsetmakerContext | undefined;
    STRING(): TerminalNode[];
    STRING(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Testlist_compContext extends ParserRuleContext {
    test(): TestContext[];
    test(i: number): TestContext;
    star_expr(): Star_exprContext[];
    star_expr(i: number): Star_exprContext;
    comp_for(): Comp_forContext | undefined;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class TrailerContext extends ParserRuleContext {
    OPEN_PAREN(): TerminalNode | undefined;
    CLOSE_PAREN(): TerminalNode | undefined;
    arglist(): ArglistContext | undefined;
    OPEN_BRACK(): TerminalNode | undefined;
    subscriptlist(): SubscriptlistContext | undefined;
    CLOSE_BRACK(): TerminalNode | undefined;
    DOT(): TerminalNode | undefined;
    NAME(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class SubscriptlistContext extends ParserRuleContext {
    subscript(): SubscriptContext[];
    subscript(i: number): SubscriptContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class SubscriptContext extends ParserRuleContext {
    test(): TestContext[];
    test(i: number): TestContext;
    COLON(): TerminalNode | undefined;
    sliceop(): SliceopContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class SliceopContext extends ParserRuleContext {
    COLON(): TerminalNode;
    test(): TestContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class ExprlistContext extends ParserRuleContext {
    expr(): ExprContext[];
    expr(i: number): ExprContext;
    star_expr(): Star_exprContext[];
    star_expr(i: number): Star_exprContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class TestlistContext extends ParserRuleContext {
    test(): TestContext[];
    test(i: number): TestContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class DictorsetmakerContext extends ParserRuleContext {
    test(): TestContext[];
    test(i: number): TestContext;
    COLON(): TerminalNode[];
    COLON(i: number): TerminalNode;
    POWER(): TerminalNode[];
    POWER(i: number): TerminalNode;
    expr(): ExprContext[];
    expr(i: number): ExprContext;
    comp_for(): Comp_forContext | undefined;
    star_expr(): Star_exprContext[];
    star_expr(i: number): Star_exprContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class ClassdefContext extends ParserRuleContext {
    CLASS(): TerminalNode;
    NAME(): TerminalNode;
    COLON(): TerminalNode;
    suite(): SuiteContext;
    OPEN_PAREN(): TerminalNode | undefined;
    CLOSE_PAREN(): TerminalNode | undefined;
    arglist(): ArglistContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class ArglistContext extends ParserRuleContext {
    argument(): ArgumentContext[];
    argument(i: number): ArgumentContext;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class ArgumentContext extends ParserRuleContext {
    test(): TestContext[];
    test(i: number): TestContext;
    ASSIGN(): TerminalNode | undefined;
    POWER(): TerminalNode | undefined;
    STAR(): TerminalNode | undefined;
    comp_for(): Comp_forContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Comp_iterContext extends ParserRuleContext {
    comp_for(): Comp_forContext | undefined;
    comp_if(): Comp_ifContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Comp_forContext extends ParserRuleContext {
    FOR(): TerminalNode;
    exprlist(): ExprlistContext;
    IN(): TerminalNode;
    or_test(): Or_testContext;
    ASYNC(): TerminalNode | undefined;
    comp_iter(): Comp_iterContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Comp_ifContext extends ParserRuleContext {
    IF(): TerminalNode;
    test_nocond(): Test_nocondContext;
    comp_iter(): Comp_iterContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Encoding_declContext extends ParserRuleContext {
    NAME(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Yield_exprContext extends ParserRuleContext {
    YIELD(): TerminalNode;
    yield_arg(): Yield_argContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
export declare class Yield_argContext extends ParserRuleContext {
    FROM(): TerminalNode | undefined;
    test(): TestContext | undefined;
    testlist(): TestlistContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: Python3Listener): void;
    exitRule(listener: Python3Listener): void;
    accept<Result>(visitor: Python3Visitor<Result>): Result;
}
