#!/bin/bash
# THE ROOM — Chapter I. Full audit harness. WP-14.
cd "$(dirname "$0")/../.." || exit 1
FAIL=0
REQUIRED_TESTS="tests/test_mirror_reasons.js tests/test_wound_skulls.js tests/test_skull_debt.js tests/test_attention.js tests/test_call_risk.js tests/test_weaken.js tests/test_token_debrief.js tests/test_engine_closures.js tests/test_endings.js tests/test_graph.js tests/test_perfect_ledger.js tests/test_endings_cinematics.js tests/test_text_system.js tests/test_text_settings.js tests/test_story_length.js tests/test_choice_verbs.js tests/test_npc_diversity.js tests/test_paths.js"
REQUIRED_TOOLS="tools/check_line_length.js tools/character_audit.js tools/svg_floor.js tools/crisis_check.js tools/a11y_check.js tools/check_story_consistency.js"
echo "================ THE ROOM - AUDIT REPORT ================"
echo "date: $(date -u +%Y-%m-%dT%H:%MZ)"
echo
for f in $REQUIRED_TESTS; do
  if [ ! -f "$f" ]; then echo "MISSING REQUIRED TEST: $f"; FAIL=1; continue; fi
  echo "---- $f"
  node "$f" || FAIL=1
done
echo
for f in $REQUIRED_TOOLS; do
  if [ ! -f "$f" ]; then echo "MISSING REQUIRED CHECK: $f"; FAIL=1; continue; fi
  echo "---- $f"
  node "$f" || FAIL=1
done
echo
echo "================ RESULT ================"
if [ $FAIL -eq 0 ]; then echo "AUDIT GREEN"; else echo "AUDIT RED - a required check failed or is missing"; fi
exit $FAIL
