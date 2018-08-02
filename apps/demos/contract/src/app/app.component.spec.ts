import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProviderModule } from '@ngeth/provider/src';
import { AuthModule, AuthWallet } from '@ngeth/auth';
import { ContractModule } from '@ngeth/contract';
import { EncoderTestContract } from './contracts/encoder-test/encoder-test.contract';
import { ContractProvider } from '@ngeth/contract/src/lib/contract.provider';
import { Provider } from '@ngeth/provider';
import { toChecksumAddress } from '@ngeth/utils';

describe('Contract Calls', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let encoderTest: EncoderTestContract;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [
          ProviderModule.init('https://ropsten.infura.io/qYd0T0JvvQ4DoxosmfD7'),
          AuthModule,
          ContractModule.forRoot(AuthWallet)
        ],
        providers: [EncoderTestContract, ContractProvider]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    let prov = TestBed.get(Provider);
    if (!prov.id) {
      prov.id = 3;
    } //initialize on which blockchain we are [here in test : ropsten]
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    encoderTest = fixture.debugElement.injector.get(EncoderTestContract);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  /////////////////// SIMPLE TYPES //////////////////////////////
  it('should get address', done => {
    const add = '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c';
    encoderTest.calls.getAddress(add).subscribe(address => {
      expect(address).not.toMatch(add);
      done();
    });
  });

  it('should get bool', done => {
    const bool = true;
    encoderTest.calls.getBool(bool).subscribe(b => {
      expect(b).not.toBe(bool);
      done();
    });
  });

  it('should get uint+10', done => {
    const num = 10;
    encoderTest.calls.getUint(num).subscribe(n => {
      expect(n).toBe((num + 10).toString());
      done();
    });
  });

  it('should get int -10', done => {
    const num = 3;
    encoderTest.calls.getInt(num).subscribe(n => {
      expect(n).toBe((num - 10).toString());
      done();
    });
  });

  it('should get string', done => {
    const string = 'Hello World';
    encoderTest.calls.getString(string).subscribe(str => {
      expect(str).toMatch(string);
      done();
    });
  });

  it('should get dynamic bytes', done => {
    const bytes = '0x123456789abcdef0';
    encoderTest.calls.getDynamicBytes(bytes).subscribe(dynamicBytes => {
      expect(dynamicBytes).toEqual(bytes);
      done();
    });
  });

  ////////////// TUPLES ///////////////////////
  it('should get dynamic tuple', done => {
    const tuple = { num: 1, str: 'Hello World', dynamicBytes: '0x456789' };
    const tupleToTest = {
      num: '1',
      str: 'Hello World',
      dynamicBytes: '0x456789'
    };
    encoderTest.calls.getDynamicTuple(tuple).subscribe(dynamicTuple => {
      expect(dynamicTuple).toEqual(tupleToTest);
      done();
    });
  });

  it('should get tuple array inside tuple', done => {
    const tuple = {
      isTrue: true,
      dynamicTuple: [
        {
          num: 1,
          str: 'Hello World',
          dynamicBytes: '0x456789'
        },
        {
          num: 2,
          str: 'Coucou',
          dynamicBytes: '0x123456'
        }
      ]
    };
    const tupleToTest = {
      isTrue: true,
      dynamicTuple: [
        {
          num: '1',
          str: 'Hello World',
          dynamicBytes: '0x456789'
        },
        {
          num: '2',
          str: 'Coucou',
          dynamicBytes: '0x123456'
        }
      ]
    };
    encoderTest.calls
      .getDynamicTupleArrayInsideTuple(tuple)
      .subscribe(dynamicTupleArrayInsideTuple => {
        expect(dynamicTupleArrayInsideTuple).toEqual(tupleToTest);
        done();
      });
  });

  it('should get static tuple array inside tuple', done => {
    const tuple = {
      isTrue: true,
      staticTuple: [
        {
          num: 35,
          isTrue: true,
          to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
        },
        {
          num: 46,
          isTrue: false,
          to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
        }
      ]
    };
    const tupleToTest = {
      isTrue: true,
      staticTuple: [
        {
          num: '35',
          isTrue: true,
          to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
        },
        {
          num: '46',
          isTrue: false,
          to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
        }
      ]
    };
    encoderTest.calls
      .getStaticTupleArrayInsideTuple(tuple)
      .subscribe(staticTupleArrayInsideTuple => {
        expect(staticTupleArrayInsideTuple).toEqual(tupleToTest);
        done();
      });
  });

  it('should get dynamic tuple array inside tuple', done => {
    const tuple = {
      isTrue: true,
      dynamicTuple: [
        {
          num: 35,
          str: 'Hello',
          dynamicBytes: '0x1234'
        },
        {
          num: 46,
          str: 'World',
          dynamicBytes: '0x5678'
        }
      ]
    };
    const tupleToTest = {
      isTrue: true,
      dynamicTuple: [
        {
          num: '35',
          str: 'Hello',
          dynamicBytes: '0x1234'
        },
        {
          num: '46',
          str: 'World',
          dynamicBytes: '0x5678'
        }
      ]
    };
    encoderTest.calls
      .getDynamicTupleArrayInsideTuple(tuple)
      .subscribe(dynamicTupleArrayInsideTuple => {
        expect(dynamicTupleArrayInsideTuple).toEqual(tupleToTest);
        done();
      });
  });

  ////////////// ARRAYS //////////////////////
  it('should get dynamic tuple array inside tuple array', done => {
    const tuple = [
      {
        isTrue: true,
        dynamicTuple: [
          {
            num: 1,
            str: 'Hello World',
            dynamicBytes: '0x123456'
          },
          {
            num: 2,
            str: 'Coucou',
            dynamicBytes: '0x456789'
          }
        ]
      },
      {
        isTrue: false,
        dynamicTuple: [
          {
            num: 3,
            str: 'Hello World',
            dynamicBytes: '0x123456'
          },
          {
            num: 4,
            str: 'Coucou',
            dynamicBytes: '0x456789'
          }
        ]
      }
    ];

    const tupleToTest = [
      {
        isTrue: true,
        dynamicTuple: [
          {
            num: '1',
            str: 'Hello World',
            dynamicBytes: '0x123456'
          },
          {
            num: '2',
            str: 'Coucou',
            dynamicBytes: '0x456789'
          }
        ]
      },
      {
        isTrue: false,
        dynamicTuple: [
          {
            num: '3',
            str: 'Hello World',
            dynamicBytes: '0x123456'
          },
          {
            num: '4',
            str: 'Coucou',
            dynamicBytes: '0x456789'
          }
        ]
      }
    ];
    encoderTest.calls
      .getDynamicTupleArrayInsideTupleArray(tuple)
      .subscribe(dynamicTupleArrayInsideTupleArray => {
        expect(dynamicTupleArrayInsideTupleArray).toEqual(tupleToTest);
        done();
      });
  });

  it('should get fixe dynamic tuple array', done => {
    const array = [
      {
        num: 1,
        str: 'Hello World',
        dynamicBytes: '0x123456'
      },
      {
        num: 2,
        str: 'Coucou',
        dynamicBytes: '0x654321'
      },
      {
        num: 3,
        str: 'Toto',
        dynamicBytes: '0xabcdef'
      }
    ];
    const arrayToTest = [
      {
        num: '1',
        str: 'Hello World',
        dynamicBytes: '0x123456'
      },
      {
        num: '2',
        str: 'Coucou',
        dynamicBytes: '0x654321'
      },
      {
        num: '3',
        str: 'Toto',
        dynamicBytes: '0xabcdef'
      }
    ];
    encoderTest.calls
      .getFixedDynamicTupleArray(array)
      .subscribe(fixedDynamicTupleArray => {
        expect(fixedDynamicTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get unfixed Uint Array', done => {
    const array = [6, 7, 8];
    const arrayToTest = ['6', '7', '8'];
    encoderTest.calls.getUnfixedUintArray(array).subscribe(unfixedUintArray => {
      expect(unfixedUintArray).toEqual(arrayToTest);
      done();
    });
  });

  it('should get unfixed static tuple array', done => {
    const array = [
      {
        num: 1,
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      },
      {
        num: 2,
        isTrue: false,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      },
      {
        num: 3,
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];

    const arrayToTest = [
      {
        num: '1',
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      },
      {
        num: '2',
        isTrue: false,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      },
      {
        num: '3',
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];

    encoderTest.calls
      .getUnfixedStaticTupleArray(array)
      .subscribe(unfixedStaticTupleArray => {
        expect(unfixedStaticTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get unfixed uint array', done => {
    const array = [6, 7, 8, 5, 7];
    const arrayToTest = ['6', '7', '8', '5', '7'];
    encoderTest.calls.getUnfixedUintArray(array).subscribe(unfixedUintArray => {
      expect(unfixedUintArray).toEqual(arrayToTest);
      done();
    });
  });

  it('should get unfixed static tuple array', done => {
    const array = [
      {
        num: 1,
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      },
      {
        num: 2,
        isTrue: false,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      },
      {
        num: 3,
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];

    const arrayToTest = [
      {
        num: '1',
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      },
      {
        num: '2',
        isTrue: false,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      },
      {
        num: '3',
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];
    encoderTest.calls
      .getUnfixedStaticTupleArray(array)
      .subscribe(unfixedStaticTupleArray => {
        expect(unfixedStaticTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get fixed uint array', done => {
    const array = [35, 47, 85];
    const arrayToTest = ['35', '47', '85'];
    encoderTest.calls.getFixedUintArray(array).subscribe(fixedUintArray => {
      expect(fixedUintArray).toEqual(arrayToTest);
      done();
    });
  });

  it('should get fixed static tuple array', done => {
    const array = [
      {
        num: 35,
        isTrue: true,
        to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
      },
      {
        num: 46,
        isTrue: false,
        to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
      },
      {
        num: 57,
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];

    const arrayToTest = [
      {
        num: '35',
        isTrue: true,
        to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
      },
      {
        num: '46',
        isTrue: false,
        to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
      },
      {
        num: '57',
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];
    
    console.log(toChecksumAddress("0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A"), "0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A");
    encoderTest.calls
      .getFixedStaticTupleArray(array)
      .subscribe(fixedStaticTupleArray => {
        expect(fixedStaticTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get unfixed dynamic tuple array', done => {
    const array = [
      {
        num: 35,
        str: 'Hello',
        dynamicBytes: '0x1234'
      },
      {
        num: 46,
        str: 'World',
        dynamicBytes: '0x5678'
      }
    ];
    const arrayToTest = [
      {
        num: '35',
        str: 'Hello',
        dynamicBytes: '0x1234'
      },
      {
        num: '46',
        str: 'World',
        dynamicBytes: '0x5678'
      }
    ];
    encoderTest.calls
      .getUnfixedDynamicTupleArray(array)
      .subscribe(unfixedDynamicTupleArray => {
        expect(unfixedDynamicTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get unfixed static tuple array', done => {
    const array = [
      {
        num: 35,
        isTrue: true,
        to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
      },
      {
        num: 46,
        isTrue: false,
        to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
      },
      {
        num: 57,
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];
    const arrayToTest = [
      {
        num: '35',
        isTrue: true,
        to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
      },
      {
        num: '46',
        isTrue: false,
        to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
      },
      {
        num: '57',
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];
    encoderTest.calls
      .getUnfixedStaticTupleArray(array)
      .subscribe(unfixedStaticTupleArray => {
        expect(unfixedStaticTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get fixed static tuple array', done => {
    const array = [
      {
        num: 35,
        isTrue: true,
        to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
      },
      {
        num: 46,
        isTrue: false,
        to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
      },
      {
        num: 57,
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];
    const arrayToTest = [
      {
        num: '35',
        isTrue: true,
        to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
      },
      {
        num: '46',
        isTrue: false,
        to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
      },
      {
        num: '57',
        isTrue: true,
        to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
      }
    ];
    encoderTest.calls
      .getFixedStaticTupleArray(array)
      .subscribe(fixedStaticTupleArray => {
        expect(fixedStaticTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get unfixed string array', done => {
    const array = ['Hello', 'World', '!'];
    encoderTest.calls
      .getUnfixedStringArray(array)
      .subscribe(unfixedStringArray => {
        expect(unfixedStringArray).toEqual(array);
        done();
      });
  });

  it('should get fixed string array', done => {
    const array = ['Hello', 'World', '!'];
    encoderTest.calls.getFixedStringArray(array).subscribe(fixedStringArray => {
      expect(fixedStringArray).toEqual(array);
      done();
    });
  });

  it('should get fixed dynamic tuple array', done => {
    const array = [
      {
        num: 1,
        str: 'Hello',
        dynamicBytes: '0x12'
      },
      {
        num: 2,
        str: 'World',
        dynamicBytes: '0x34'
      },
      {
        num: 3,
        str: '!',
        dynamicBytes: '0x56'
      }
    ];
    const arrayToTest = [
      {
        num: '1',
        str: 'Hello',
        dynamicBytes: '0x12'
      },
      {
        num: '2',
        str: 'World',
        dynamicBytes: '0x34'
      },
      {
        num: '3',
        str: '!',
        dynamicBytes: '0x56'
      }
    ];
    encoderTest.calls
      .getFixedDynamicTupleArray(array)
      .subscribe(fixedDynamicTupleArray => {
        expect(fixedDynamicTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get dynamic tuple array inside tuple array', done => {
    const array = [
      // Static tuple 1
      {
        isTrue: true,
        dynamicTuple: [
          {
            num: 35,
            str: 'Hello',
            dynamicBytes: '0x1234'
          }
        ]
      },
      // Static Tuple 2
      {
        isTrue: true,
        dynamicTuple: [
          {
            num: 35,
            str: 'Hello',
            dynamicBytes: '0x1234'
          },
          {
            num: 46,
            str: 'World',
            dynamicBytes: '0x5678'
          }
        ]
      },
      // Static Tuple 3
      {
        isTrue: true,
        dynamicTuple: [
          {
            num: 35,
            str: 'Hello',
            dynamicBytes: '0x1234'
          },
          {
            num: 46,
            str: 'World',
            dynamicBytes: '0x5678'
          },
          {
            num: 57,
            str: '!!!',
            dynamicBytes: '0xabcd'
          }
        ]
      }
    ];
    const arrayToTest = [
      // Static tuple 1
      {
        isTrue: true,
        dynamicTuple: [
          {
            num: '35',
            str: 'Hello',
            dynamicBytes: '0x1234'
          }
        ]
      },
      // Static Tuple 2
      {
        isTrue: true,
        dynamicTuple: [
          {
            num: '35',
            str: 'Hello',
            dynamicBytes: '0x1234'
          },
          {
            num: '46',
            str: 'World',
            dynamicBytes: '0x5678'
          }
        ]
      },
      // Static Tuple 3
      {
        isTrue: true,
        dynamicTuple: [
          {
            num: '35',
            str: 'Hello',
            dynamicBytes: '0x1234'
          },
          {
            num: '46',
            str: 'World',
            dynamicBytes: '0x5678'
          },
          {
            num: '57',
            str: '!!!',
            dynamicBytes: '0xabcd'
          }
        ]
      }
    ];
    encoderTest.calls
      .getDynamicTupleArrayInsideTupleArray(array)
      .subscribe(dynamicTupleArrayInsideTupleArray => {
        expect(dynamicTupleArrayInsideTupleArray).toEqual(arrayToTest);
        done();
      });
  });

  it('should get static tuple array inside tuple array', done => {
    const array = [
      // Static tuple 1
      {
        isTrue: true,
        staticTuple: [
          {
            num: 35,
            isTrue: true,
            to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
          }
        ]
      },
      // Static Tuple 2
      {
        isTrue: true,
        staticTuple: [
          {
            num: 35,
            isTrue: true,
            to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
          },
          {
            num: 46,
            isTrue: false,
            to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
          }
        ]
      },
      // Static Tuple 3
      {
        isTrue: true,
        staticTuple: [
          {
            num: 35,
            isTrue: true,
            to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
          },
          {
            num: 46,
            isTrue: false,
            to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
          },
          {
            num: 57,
            isTrue: true,
            to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
          }
        ]
      }
    ];
    const arrayToTest = [
      // Static tuple 1
      {
        isTrue: true,
        staticTuple: [
          {
            num: '35',
            isTrue: true,
            to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
          }
        ]
      },
      // Static Tuple 2
      {
        isTrue: true,
        staticTuple: [
          {
            num: '35',
            isTrue: true,
            to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
          },
          {
            num: '46',
            isTrue: false,
            to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
          }
        ]
      },
      // Static Tuple 3
      {
        isTrue: true,
        staticTuple: [
          {
            num: '35',
            isTrue: true,
            to: '0xbEbdCb7685AB170E24215B45c81D9Ffe00bba54A'
          },
          {
            num: '46',
            isTrue: false,
            to: '0xBeBDCB7685aB170E24215b45c81d9fFE00BBa54B'
          },
          {
            num: '57',
            isTrue: true,
            to: '0xbEbDCB7685ab170E24215B45c81d9FFE00BBa54c'
          }
        ]
      }
    ];
    encoderTest.calls
      .getStaticTupleArrayInsideTupleArray(array)
      .subscribe(staticTupleArrayInsideTupleArray => {
        expect(staticTupleArrayInsideTupleArray).toEqual(arrayToTest);
        done();
      });
  });
});
