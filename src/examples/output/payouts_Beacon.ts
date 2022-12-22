import { Cell, Slice, StackItem, Address, Builder, InternalMessage, CommonMessageInfo, CellMessage, beginCell, serializeDict, TupleSlice4, readString, stringToCell } from 'ton';
import { ContractExecutor, createExecutorFromCode, ExecuteError } from 'ton-nodejs';
import BN from 'bn.js';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function packStateInit(src: StateInit): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeRef(src.code);
    b_0 = b_0.storeRef(src.data);
    return b_0.endCell();
}

export function packStackStateInit(src: StateInit, __stack: StackItem[]) {
    __stack.push({ type: 'cell', cell: src.code });
    __stack.push({ type: 'cell', cell: src.data });
}

export function packTupleStateInit(src: StateInit): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: src.code });
    __stack.push({ type: 'cell', cell: src.data });
    return __stack;
}

export function unpackStackStateInit(slice: TupleSlice4): StateInit {
    const code = slice.readCell();
    const data = slice.readCell();
    return { $$type: 'StateInit', code: code, data: data };
}
export function unpackTupleStateInit(slice: TupleSlice4): StateInit {
    const code = slice.readCell();
    const data = slice.readCell();
    return { $$type: 'StateInit', code: code, data: data };
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: BN;
}

export function packContext(src: Context): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounced);
    b_0 = b_0.storeAddress(src.sender);
    b_0 = b_0.storeInt(src.value, 257);
    return b_0.endCell();
}

export function packStackContext(src: Context, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.bounced ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.sender).endCell() });
    __stack.push({ type: 'int', value: src.value });
}

export function packTupleContext(src: Context): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.bounced ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.sender).endCell() });
    __stack.push({ type: 'int', value: src.value });
    return __stack;
}

export function unpackStackContext(slice: TupleSlice4): Context {
    const bounced = slice.readBoolean();
    const sender = slice.readAddress();
    const value = slice.readBigNumber();
    return { $$type: 'Context', bounced: bounced, sender: sender, value: value };
}
export function unpackTupleContext(slice: TupleSlice4): Context {
    const bounced = slice.readBoolean();
    const sender = slice.readAddress();
    const value = slice.readBigNumber();
    return { $$type: 'Context', bounced: bounced, sender: sender, value: value };
}
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: BN;
    mode: BN;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function packSendParameters(src: SendParameters): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounce);
    b_0 = b_0.storeAddress(src.to);
    b_0 = b_0.storeInt(src.value, 257);
    b_0 = b_0.storeInt(src.mode, 257);
    if (src.body !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.body);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.code !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.code);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.data !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.data);
    } else {
        b_0 = b_0.storeBit(false);
    }
    return b_0.endCell();
}

export function packStackSendParameters(src: SendParameters, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.bounce ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.to).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'int', value: src.mode });
    if (src.body !== null) {
        __stack.push({ type: 'cell', cell: src.body });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.code !== null) {
        __stack.push({ type: 'cell', cell: src.code });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.data !== null) {
        __stack.push({ type: 'cell', cell: src.data });
    } else {
        __stack.push({ type: 'null' });
    }
}

export function packTupleSendParameters(src: SendParameters): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.bounce ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.to).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'int', value: src.mode });
    if (src.body !== null) {
        __stack.push({ type: 'cell', cell: src.body });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.code !== null) {
        __stack.push({ type: 'cell', cell: src.code });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.data !== null) {
        __stack.push({ type: 'cell', cell: src.data });
    } else {
        __stack.push({ type: 'null' });
    }
    return __stack;
}

export function unpackStackSendParameters(slice: TupleSlice4): SendParameters {
    const bounce = slice.readBoolean();
    const to = slice.readAddress();
    const value = slice.readBigNumber();
    const mode = slice.readBigNumber();
    const body = slice.readCellOpt();
    const code = slice.readCellOpt();
    const data = slice.readCellOpt();
    return { $$type: 'SendParameters', bounce: bounce, to: to, value: value, mode: mode, body: body, code: code, data: data };
}
export function unpackTupleSendParameters(slice: TupleSlice4): SendParameters {
    const bounce = slice.readBoolean();
    const to = slice.readAddress();
    const value = slice.readBigNumber();
    const mode = slice.readBigNumber();
    const body = slice.readCellOpt();
    const code = slice.readCellOpt();
    const data = slice.readCellOpt();
    return { $$type: 'SendParameters', bounce: bounce, to: to, value: value, mode: mode, body: body, code: code, data: data };
}
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function packChangeOwner(src: ChangeOwner): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3067051791, 32);
    b_0 = b_0.storeAddress(src.newOwner);
    return b_0.endCell();
}

export function packStackChangeOwner(src: ChangeOwner, __stack: StackItem[]) {
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.newOwner).endCell() });
}

export function packTupleChangeOwner(src: ChangeOwner): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.newOwner).endCell() });
    return __stack;
}

export function unpackStackChangeOwner(slice: TupleSlice4): ChangeOwner {
    const newOwner = slice.readAddress();
    return { $$type: 'ChangeOwner', newOwner: newOwner };
}
export function unpackTupleChangeOwner(slice: TupleSlice4): ChangeOwner {
    const newOwner = slice.readAddress();
    return { $$type: 'ChangeOwner', newOwner: newOwner };
}
export type CanPayout = {
    $$type: 'CanPayout';
    amount: BN;
}

export function packCanPayout(src: CanPayout): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(1050587494, 32);
    b_0 = b_0.storeInt(src.amount, 257);
    return b_0.endCell();
}

export function packStackCanPayout(src: CanPayout, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.amount });
}

export function packTupleCanPayout(src: CanPayout): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.amount });
    return __stack;
}

export function unpackStackCanPayout(slice: TupleSlice4): CanPayout {
    const amount = slice.readBigNumber();
    return { $$type: 'CanPayout', amount: amount };
}
export function unpackTupleCanPayout(slice: TupleSlice4): CanPayout {
    const amount = slice.readBigNumber();
    return { $$type: 'CanPayout', amount: amount };
}
export type CanPayoutResponse = {
    $$type: 'CanPayoutResponse';
    amount: BN;
    address: Address;
    ok: boolean;
}

export function packCanPayoutResponse(src: CanPayoutResponse): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(1861678417, 32);
    b_0 = b_0.storeInt(src.amount, 257);
    b_0 = b_0.storeAddress(src.address);
    b_0 = b_0.storeBit(src.ok);
    return b_0.endCell();
}

export function packStackCanPayoutResponse(src: CanPayoutResponse, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.amount });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.address).endCell() });
    __stack.push({ type: 'int', value: src.ok ? new BN(-1) : new BN(0) });
}

export function packTupleCanPayoutResponse(src: CanPayoutResponse): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.amount });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.address).endCell() });
    __stack.push({ type: 'int', value: src.ok ? new BN(-1) : new BN(0) });
    return __stack;
}

export function unpackStackCanPayoutResponse(slice: TupleSlice4): CanPayoutResponse {
    const amount = slice.readBigNumber();
    const address = slice.readAddress();
    const ok = slice.readBoolean();
    return { $$type: 'CanPayoutResponse', amount: amount, address: address, ok: ok };
}
export function unpackTupleCanPayoutResponse(slice: TupleSlice4): CanPayoutResponse {
    const amount = slice.readBigNumber();
    const address = slice.readAddress();
    const ok = slice.readBoolean();
    return { $$type: 'CanPayoutResponse', amount: amount, address: address, ok: ok };
}
export async function Beacon_init(master: Address, owner: Address) {
    const __code = 'te6ccgECGgEAAmsAART/APSkE/S88sgLAQIBYgIDAgLLBAUCASAWFwIBIAYHAgFiEBECAdQICQIBWAsMAcccCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAMFRBFW8D+GECjiww7UTQ1AH4YvpAAQH6QAEB0gBVIGwTVQLwE8j4QgHMVSBazxZYzxbKAMntVOCCED6esWa64wIw8sCCgCgALCBu8tCAgAIDtRNDUAfhi+kABAfpAAQHSAFUgbBMD0x8BghA+nrFmuvLggYEBAdcAATFBMPASyPhCAcxVIFrPFljPFsoAye1UABVZR/AcoA4HABygCAIBIA0OAfcyHEBygFQB/ANcAHKAlAFzxZQA/oCcAHKaCNusyVus7GOPX/wDchw8A1w8A0kbrOZf/ANBPABUATMlTQDcPAN4iRus5l/8A0E8AFQBMyVNANw8A3icPANAn/wDQLJWMyWMzMBcPAN4iFus5h/8A0B8AEBzJQxcPAN4skBgDwAhPhBbyMwMX8CcIBCWG1t8A6AABPsAAgEgEhMCASAUFQAdHADyMwDWs8WWM8WygDJgAAUMDGAArz4QW8jMDEkxwXy4IOCEAX14QBw+wIhjh9/MiJ/yFUgghBu9vVRUATLHxKBAQHPAAHPFsoAyfAPjh0icMhVIIIQbvb1UVAEyx8SgQEBzwABzxbKAMnwD+KAABRbcIAAzvijvaiaGoA/DF9IACA/SAAgOkAKpA2CfgIwCAWYYGQAJsOX8BCAAcbL0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwQM51aecV+dJQsB1hbiZHsoA==';
    const depends = new Map<string, Cell>();
    let systemCell = beginCell().storeDict(null).endCell();
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: systemCell });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(master).endCell() });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(owner).endCell() });
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let executor = await createExecutorFromCode({ code: codeCell, data: new Cell() });
    let res = await executor.get('init_Beacon', __stack, { debug: true });
    if (res.debugLogs.length > 0) { console.warn(res.debugLogs); }
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

export const Beacon_errors: { [key: string]: string } = {
    '2': `Stack undeflow`,
    '3': `Stack overflow`,
    '4': `Integer overflow`,
    '5': `Integer out of expected range`,
    '6': `Invalid opcode`,
    '7': `Type check error`,
    '8': `Cell overflow`,
    '9': `Cell underflow`,
    '10': `Dictionary error`,
    '13': `Out of gas error`,
    '32': `Method ID not found`,
    '34': `Action is invalid or not supported`,
    '37': `Not enough TON`,
    '38': `Not enough extra-currencies`,
    '128': `Null reference exception`,
    '129': `Invalid serialization prefix`,
    '130': `Invalid incoming message`,
    '131': `Constraints error`,
    '132': `Access denied`,
    '133': `Contract stopped`,
    '134': `Invalid argument`,
}

export class Beacon {
    readonly executor: ContractExecutor; 
    constructor(executor: ContractExecutor) { this.executor = executor; } 
    
    async send(args: { amount: BN, from?: Address, debug?: boolean }, message: CanPayout) {
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CanPayout') {
            body = packCanPayout(message);
        }
        if (body === null) { throw new Error('Invalid message type'); }
        try {
            let r = await this.executor.internal(new InternalMessage({
                to: this.executor.address,
                from: args.from || this.executor.address,
                bounce: false,
                value: args.amount,
                body: new CommonMessageInfo({
                    body: new CellMessage(body!)
                })
            }), { debug: args.debug });
            if (r.debugLogs.length > 0) { console.warn(r.debugLogs); }
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (Beacon_errors[e.exitCode.toString()]) {
                    throw new Error(Beacon_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getOwner() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('owner', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readAddress();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (Beacon_errors[e.exitCode.toString()]) {
                    throw new Error(Beacon_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
}