(function () {
    Blockly.Blocks['define_command'] = {
        init: function() {
            this.appendDummyInput()
                .appendField('Command Name:')
                //TODO: include reserved keywords
                .appendField(new Blockly.FieldTextInput('MyCommand', (text) => {
                    return text.replace(/^[\d_]+/g, '').split(/\s+/g).map((part) => {
                        return part.charAt(0).toUpperCase() + part.slice(1);
                    }).join('').replace(/[^A-Za-z\d_]/g, '');
                }), 'COMMAND_NAME')
            this.appendStatementInput('INIT')
                .appendField('initialize');
            this.appendStatementInput('EXECUTE')
                .appendField('execute');
            this.appendStatementInput('END')
                .appendField('end');
            this.appendStatementInput('IS_FINISHED')
                .appendField('is finished');
            this.setColour(160);
            this.setTooltip('Defines a command.');
            // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
        }
    };
    
    Blockly.Blocks['test'] = {
        init: function() {
            this.appendDummyInput()
                .appendField('Command Name:')
                //TODO: include reserved keywords
                .appendField(new Blockly.FieldTextInput('MyCommand', (text) => {
                    return text.replace(/^[\d_]+/g, '').split(/\s+/g).map((part) => {
                        return part.charAt(0).toUpperCase() + part.slice(1);
                    }).join('').replace(/[^A-Za-z\d_]/g, '');
                }), 'COMMAND_NAME')
            this.appendStatementInput('STUFF')
                .appendField('stuff');
            this.setColour(160);
            this.setTooltip('Defines a command.');
            // this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
        }
    };

    Blockly.Python.forBlock['define_command'] = (block, generator) => {
        const command_name = block.getFieldValue('COMMAND_NAME');

        return `class ${command_name}(commands2.CommandBase):\n` +
        `${generator.INDENT}def __init__(self):\n` +
        `${generator.INDENT.repeat(2)}super().__init__()\n` +
        '\n' +
        `${generator.prefixLines(generator.statementToCode(block, 'INIT', 9) || `${generator.INDENT}pass`, generator.INDENT)}\n\n` +
        `${generator.INDENT}def execute(self):\n` +
        `${generator.prefixLines(generator.statementToCode(block, 'EXECUTE', 9) || `${generator.INDENT}pass`, generator.INDENT)}\n\n` +
        `${generator.INDENT}def end(self, interrupted: bool):\n` +
        `${generator.prefixLines(generator.statementToCode(block, 'END', 9) || `${generator.INDENT}pass`, generator.INDENT)}\n\n` +
        `${generator.INDENT}def isFinished(self):\n` +
        `${generator.prefixLines(generator.statementToCode(block, 'IS_FINISHED', 9) || `${generator.INDENT}return False`, generator.INDENT)}`;
    };
}());