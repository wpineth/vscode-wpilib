(function () {
    Blockly.Python.INDENT = '    ';

    window.addEventListener('load', () => {
        const vscode = acquireVsCodeApi();
    
        const workspace = Blockly.inject('blockly-workspace', {
            toolbox: {
                kind: 'categoryToolbox',
                contents: [
                    {
                        kind: 'category',
                        name: 'Robot',
                        categorystyle: 'logic_category',
                        contents: [
                            {
                                kind: 'block',
                                type: 'define_command'
                            }
                        ]
                    },
                  {
                    kind: 'category',
                    name: 'Logic',
                    categorystyle: 'logic_category',
                    contents: [
                      {
                        type: 'controls_if',
                        kind: 'block',
                      },
                      {
                        type: 'logic_compare',
                        kind: 'block',
                        fields: {
                          OP: 'EQ',
                        },
                      },
                      {
                        type: 'logic_operation',
                        kind: 'block',
                        fields: {
                          OP: 'AND',
                        },
                      },
                      {
                        type: 'logic_negate',
                        kind: 'block',
                      },
                      {
                        type: 'logic_boolean',
                        kind: 'block',
                        fields: {
                          BOOL: 'TRUE',
                        },
                      },
                      {
                        type: 'logic_null',
                        kind: 'block',
                        enabled: false,
                      },
                      {
                        type: 'logic_ternary',
                        kind: 'block',
                      },
                    ],
                  },
                  {
                    kind: 'category',
                    name: 'Loops',
                    categorystyle: 'loop_category',
                    contents: [
                      {
                        type: 'controls_repeat_ext',
                        kind: 'block',
                        inputs: {
                          TIMES: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 10,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'controls_repeat',
                        kind: 'block',
                        enabled: false,
                        fields: {
                          TIMES: 10,
                        },
                      },
                      {
                        type: 'controls_whileUntil',
                        kind: 'block',
                        fields: {
                          MODE: 'WHILE',
                        },
                      },
                      {
                        type: 'controls_for',
                        kind: 'block',
                        fields: {
                          VAR: {
                            name: 'i',
                          },
                        },
                        inputs: {
                          FROM: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 1,
                              },
                            },
                          },
                          TO: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 10,
                              },
                            },
                          },
                          BY: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 1,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'controls_forEach',
                        kind: 'block',
                        fields: {
                          VAR: {
                            name: 'j',
                          },
                        },
                      },
                      {
                        type: 'controls_flow_statements',
                        kind: 'block',
                        enabled: false,
                        fields: {
                          FLOW: 'BREAK',
                        },
                      },
                    ],
                  },
                  {
                    kind: 'category',
                    name: 'Math',
                    categorystyle: 'math_category',
                    contents: [
                      {
                        type: 'math_number',
                        kind: 'block',
                        fields: {
                          NUM: 123,
                        },
                      },
                      {
                        type: 'math_arithmetic',
                        kind: 'block',
                        fields: {
                          OP: 'ADD',
                        },
                        inputs: {
                          A: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 1,
                              },
                            },
                          },
                          B: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 1,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'math_single',
                        kind: 'block',
                        fields: {
                          OP: 'ROOT',
                        },
                        inputs: {
                          NUM: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 9,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'math_trig',
                        kind: 'block',
                        fields: {
                          OP: 'SIN',
                        },
                        inputs: {
                          NUM: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 45,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'math_constant',
                        kind: 'block',
                        fields: {
                          CONSTANT: 'PI',
                        },
                      },
                      {
                        type: 'math_number_property',
                        kind: 'block',
                        fields: {
                          PROPERTY: 'EVEN',
                        },
                        inputs: {
                          NUMBER_TO_CHECK: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 0,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'math_round',
                        kind: 'block',
                        fields: {
                          OP: 'ROUND',
                        },
                        inputs: {
                          NUM: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 3.1,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'math_on_list',
                        kind: 'block',
                        fields: {
                          OP: 'SUM',
                        },
                      },
                      {
                        type: 'math_modulo',
                        kind: 'block',
                        inputs: {
                          DIVIDEND: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 64,
                              },
                            },
                          },
                          DIVISOR: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 10,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'math_constrain',
                        kind: 'block',
                        inputs: {
                          VALUE: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 50,
                              },
                            },
                          },
                          LOW: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 1,
                              },
                            },
                          },
                          HIGH: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 100,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'math_random_int',
                        kind: 'block',
                        inputs: {
                          FROM: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 1,
                              },
                            },
                          },
                          TO: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 100,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'math_random_float',
                        kind: 'block',
                      },
                      {
                        type: 'math_atan2',
                        kind: 'block',
                        inputs: {
                          X: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 1,
                              },
                            },
                          },
                          Y: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 1,
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                  {
                    kind: 'category',
                    name: 'Text',
                    categorystyle: 'text_category',
                    contents: [
                      {
                        type: 'text',
                        kind: 'block',
                        fields: {
                          TEXT: '',
                        },
                      },
                      {
                        type: 'text_multiline',
                        kind: 'block',
                        fields: {
                          TEXT: '',
                        },
                      },
                      {
                        type: 'text_join',
                        kind: 'block',
                      },
                      {
                        type: 'text_append',
                        kind: 'block',
                        fields: {
                          name: 'item',
                        },
                        inputs: {
                          TEXT: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: '',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_length',
                        kind: 'block',
                        inputs: {
                          VALUE: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: 'abc',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_isEmpty',
                        kind: 'block',
                        inputs: {
                          VALUE: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: '',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_indexOf',
                        kind: 'block',
                        fields: {
                          END: 'FIRST',
                        },
                        inputs: {
                          VALUE: {
                            block: {
                              type: 'variables_get',
                              fields: {
                                VAR: {
                                  name: 'text',
                                },
                              },
                            },
                          },
                          FIND: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: 'abc',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_charAt',
                        kind: 'block',
                        fields: {
                          WHERE: 'FROM_START',
                        },
                        inputs: {
                          VALUE: {
                            block: {
                              type: 'variables_get',
                              fields: {
                                VAR: {
                                  name: 'text',
                                },
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_getSubstring',
                        kind: 'block',
                        fields: {
                          WHERE1: 'FROM_START',
                          WHERE2: 'FROM_START',
                        },
                        inputs: {
                          STRING: {
                            block: {
                              type: 'variables_get',
                              fields: {
                                VAR: {
                                  name: 'text',
                                },
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_changeCase',
                        kind: 'block',
                        fields: {
                          CASE: 'UPPERCASE',
                        },
                        inputs: {
                          TEXT: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: 'abc',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_trim',
                        kind: 'block',
                        fields: {
                          MODE: 'BOTH',
                        },
                        inputs: {
                          TEXT: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: 'abc',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_count',
                        kind: 'block',
                        inputs: {
                          SUB: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: '',
                              },
                            },
                          },
                          TEXT: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: '',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_replace',
                        kind: 'block',
                        inputs: {
                          FROM: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: '',
                              },
                            },
                          },
                          TO: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: '',
                              },
                            },
                          },
                          TEXT: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: '',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_reverse',
                        kind: 'block',
                        inputs: {
                          TEXT: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: '',
                              },
                            },
                          },
                        },
                      },
              
                      {
                        type: 'text_print',
                        kind: 'block',
                        inputs: {
                          TEXT: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: 'abc',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'text_prompt_ext',
                        kind: 'block',
                        fields: {
                          TYPE: 'TEXT',
                        },
                        inputs: {
                          TEXT: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: 'abc',
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                  {
                    kind: 'category',
                    name: 'Lists',
                    categorystyle: 'list_category',
                    contents: [
                      {
                        type: 'lists_create_with',
                        kind: 'block',
                      },
                      {
                        type: 'lists_create_with',
                        kind: 'block',
                      },
                      {
                        type: 'lists_repeat',
                        kind: 'block',
                        inputs: {
                          NUM: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 5,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'lists_length',
                        kind: 'block',
                      },
                      {
                        type: 'lists_isEmpty',
                        kind: 'block',
                      },
                      {
                        type: 'lists_indexOf',
                        kind: 'block',
              
                        fields: {
                          END: 'FIRST',
                        },
                        inputs: {
                          VALUE: {
                            block: {
                              type: 'variables_get',
                              fields: {
                                VAR: {
                                  name: 'list',
                                },
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'lists_getIndex',
                        kind: 'block',
                        fields: {
                          MODE: 'GET',
                          WHERE: 'FROM_START',
                        },
                        inputs: {
                          VALUE: {
                            block: {
                              type: 'variables_get',
                              fields: {
                                VAR: {
                                  name: 'list',
                                },
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'lists_setIndex',
                        kind: 'block',
                        fields: {
                          MODE: 'SET',
                          WHERE: 'FROM_START',
                        },
                        inputs: {
                          LIST: {
                            block: {
                              type: 'variables_get',
                              fields: {
                                VAR: {
                                  name: 'list',
                                },
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'lists_getSublist',
                        kind: 'block',
                        fields: {
                          WHERE1: 'FROM_START',
                          WHERE2: 'FROM_START',
                        },
                        inputs: {
                          LIST: {
                            block: {
                              type: 'variables_get',
                              fields: {
                                VAR: {
                                  name: 'list',
                                },
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'lists_split',
                        kind: 'block',
              
                        fields: {
                          MODE: 'SPLIT',
                        },
                        inputs: {
                          DELIM: {
                            shadow: {
                              type: 'text',
                              fields: {
                                TEXT: ',',
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'lists_sort',
                        kind: 'block',
              
                        fields: {
                          TYPE: 'NUMERIC',
                          DIRECTION: '1',
                        },
                      },
                      {
                        type: 'lists_reverse',
                        kind: 'block',
                      },
                    ],
                  },
                  {
                    kind: 'category',
                    categorystyle: 'colour_category',
                    name: 'Colour',
                    contents: [
                      {
                        type: 'colour_picker',
                        kind: 'block',
                        fields: {
                          COLOUR: '#ff0000',
                        },
                      },
                      {
                        type: 'colour_random',
                        kind: 'block',
                      },
                      {
                        type: 'colour_rgb',
                        kind: 'block',
                        inputs: {
                          RED: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 100,
                              },
                            },
                          },
                          GREEN: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 50,
                              },
                            },
                          },
                          BLUE: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 0,
                              },
                            },
                          },
                        },
                      },
                      {
                        type: 'colour_blend',
                        kind: 'block',
                        inputs: {
                          COLOUR1: {
                            shadow: {
                              type: 'colour_picker',
                              fields: {
                                COLOUR: '#ff0000',
                              },
                            },
                          },
                          COLOUR2: {
                            shadow: {
                              type: 'colour_picker',
                              fields: {
                                COLOUR: '#3333ff',
                              },
                            },
                          },
                          RATIO: {
                            shadow: {
                              type: 'math_number',
                              fields: {
                                NUM: 0.5,
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                  {
                    kind: 'sep',
                  },
                  {
                    kind: 'category',
                    name: 'Variables',
                    custom: 'VARIABLE',
                    categorystyle: 'variable_category',
                  },
                  {
                    kind: 'category',
                    name: 'Functions',
                    custom: 'PROCEDURE',
                    categorystyle: 'procedure_category',
                  },
                ],
            }
        });

        function updateText(){
            const viewport = document.querySelector('#viewport');
    
            viewport.innerHTML = '';
    
            const document_contents = document.createElement('p');

            document_contents.style.whiteSpace = 'pre-wrap';

            document_contents.style.fontFamily = 'monospace';
    
            document_contents.innerText = Blockly.Python.workspaceToCode(workspace);
    
            viewport.appendChild(document_contents);
        }

        function onChange(e){
            if(!workspace.isDragging() && [
                Blockly.Events.BLOCK_CHANGE,
                Blockly.Events.BLOCK_CREATE,
                Blockly.Events.BLOCK_DELETE,
                Blockly.Events.BLOCK_MOVE
            ].includes(e.type)){
                const intermediate = `${Blockly.Python.workspaceToCode(workspace)}\n\n# ${JSON.stringify(Blockly.serialization.workspaces.save(workspace))}`;

                vscode.postMessage({
                    type: 'replace',
                    body: intermediate
                });

                vscode.setState({
                    text: intermediate
                });

                updateText();
            }
        }

        function onFinishedLoading(e){
            if(e.type === 'finished_loading'){
                workspace.removeChangeListener(onFinishedLoading);

                workspace.addChangeListener(onChange);
            }
        }

        function updateContent(text){
            const lines = text.split('\n');

            try{
                workspace.addChangeListener(onFinishedLoading);
                Blockly.serialization.workspaces.load(JSON.parse(lines[lines.length - 1].slice(2)), workspace);
            }catch(err){
                workspace.addChangeListener(onChange);
                console.log('Failed to deserialize document. Reason:', err.message);
            }
            
            updateText(lines.slice(0, lines.length - 2).join('\n'));
        }

        // Handle messages sent from the extension to the webview
        window.addEventListener('message', (e) => {
            const message = e.data; // The json data that the extension sent
            switch (message.type) {
                case 'load':
                    // Update our webview's content
                    updateContent(message.text);
    
                    // Then persist state information.
                    // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
                    vscode.setState({
                        text: message.text
                    });
    
                    break;
            }
        });
    
        // Webviews are normally torn down when not visible and re-created when they become visible again.
        // State lets us save information across these re-loads
        const state = vscode.getState();
        if(state){
            updateContent(state.text);
        }
    });
}());